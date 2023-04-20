import {
    ArrayNode,
    AstNode,
    FunctionNode,
    InfixOperationNode,
    PostfixOperationNode,
    PrefixOperationNode,
    RootNode,
    ValueNode,
    VariableNode
} from 'core/ast';

export class Builder {

    root(child?: AstNode): RootNode {
        return new RootNode(child);
    }

    prefixOperation(operator: string, left: AstNode): PrefixOperationNode {
        return new PrefixOperationNode(operator, left);
    }

    infixOperation(operator: string, left: AstNode, right: AstNode): InfixOperationNode {
        return new InfixOperationNode(operator, left, right);
    }

    postfixOperation(operator: string, right: AstNode): PostfixOperationNode {
        return new PostfixOperationNode(operator, right);
    }
    
    function(identifier: string, ...parameters: AstNode[]): FunctionNode {
        return new FunctionNode(identifier, ...parameters);
    }

    variable(identifier: string): VariableNode {
        return new VariableNode(identifier);
    }

    array(...items: AstNode[]): ArrayNode {
        return new ArrayNode(...items);
    }

    value(type: string, value: any): ValueNode {
        return new ValueNode(type, value);
    }

}

export default Builder;