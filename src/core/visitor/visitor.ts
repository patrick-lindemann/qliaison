import type {
    ArrayNode,
    FunctionNode,
    InfixOperationNode,
    PostfixOperationNode,
    PrefixOperationNode,
    RootNode,
    ValueNode,
    VariableNode
} from '../ast';

export abstract class Visitor<OutputType> {

    abstract visitRootNode(node: RootNode): OutputType;
    abstract visitPrefixOperatorNode(node: PrefixOperationNode): unknown;
    abstract visitPostfixOperatorNode(node: PostfixOperationNode): unknown;
    abstract visitInfixOperatorNode(node: InfixOperationNode): unknown;
    abstract visitVariableNode(node: VariableNode): unknown;
    abstract visitFunctionNode(node: FunctionNode): unknown;
    abstract visitArrayNode(node: ArrayNode): unknown;
    abstract visitValueNode(node: ValueNode): unknown;

}

export default Visitor;