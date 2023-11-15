import fetch from 'node-fetch';
import * as vscode from 'vscode';

export class RemoteAttributesCompletionProvider implements vscode.CompletionItemProvider {

    private hasBeenInitialized = false;
    private cachedAttributes: AttributeDefinition[] = [];

    async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): Promise<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem> | null | undefined> {
        if(!this.hasBeenInitialized) {
            await this.initCache();
        }
        
        const completionItems = [];
        for (const attributeDefinition of this.cachedAttributes) {
            // TODO: handle range
            const completionItem: vscode.CompletionItem = new vscode.CompletionItem(attributeDefinition.name);
            completionItem.insertText = `{${attributeDefinition.name}}`;
            completionItem.detail = attributeDefinition.defaultValue;
            completionItem.filterText = `${attributeDefinition.name} ${attributeDefinition.defaultValue}`;
            completionItem.documentation = `Attribute definition coming from ${attributeDefinition.origin}`;
            completionItems.push(completionItem);
        }
        return completionItems;
    }
    private async initCache() {
        this.hasBeenInitialized = true;
        const remoteDefinitions = vscode.workspace.getConfiguration().get('redhat.asciidoc.remoteAttributeDefinitions') as string[];
        for (const remoteDef of remoteDefinitions) {
            const response = await fetch(remoteDef);
            if (response.ok) {
                //TODO: would be better to reuse asciidoctor js with load method (but issue Opal...)
                for (const line of (await response.text()).split('\n')) {
                    if (line.startsWith(':')) {
                        const secondDoubleDot = line.indexOf(':', 1);
                        if(secondDoubleDot !== -1) {
                            const key = line.substring(1, secondDoubleDot);
                            const value = line.substring(secondDoubleDot + 1).trim();
                            const attributeDef = new AttributeDefinition(key, value, remoteDef);
                            this.cachedAttributes.push(attributeDef);
                        }
                    }
                }


            } else {
                // TODO: log in output
            }
        }
    }

    resolveCompletionItem?(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem> {
        throw new Error('Method not implemented.');
    }

}

class AttributeDefinition {

    public name:string;
    public defaultValue: string;
    public origin: string;

    constructor (name: string, defaultValue: string, origin: string) {
        this.name = name;
        this.defaultValue = defaultValue;
        this.origin = origin;
    }
}
