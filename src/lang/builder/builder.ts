import { VariableNode } from 'core/ast';
import {
    And, Array, Boolean, Comparison, Condition, Equals, Function,
    GreaterThan, In, IsEmpty, IsNotEmpty, IsNotNull, IsNull, LessThan,
    LessThanEquals, Like, Not, NotEquals, NotIn, Null, Number, Or, ParseTree,
    String, Value, Variable, keywords
} from 'lang/defs';

/* Types */

export type POJO = null | boolean | number | string;

/* Classes */

export class Builder {

    /* Methods */

    root(expr: Condition | Comparison): ParseTree {
        return new ParseTree(expr);
    }

    /* Logical Operators */

    not(expr: Condition | Comparison): Condition {
        return new Not(expr);
    }

    and(left: Condition | Comparison, right: Condition | Comparison): Condition;
    and(cond1: Condition | Comparison, cond2: Condition | Comparison, ...conditions: (Condition | Comparison)[]): Condition;
    and(cond1: Condition | Comparison, cond2: Condition | Comparison, ...conditions: (Condition | Comparison)[]): Condition {
        return conditions.reduce(
            (acc, item) => new And(acc, item),
            new And(cond1, cond2)
        ) as Condition;
    }

    or(left: Condition | Comparison, right: Condition | Comparison): Condition;
    or(cond1: Condition | Comparison, cond2: Condition | Comparison, ...conditions: (Condition | Comparison)[]): Condition;
    or(cond1: Condition | Comparison, cond2: Condition | Comparison, ...conditions: (Condition | Comparison)[]): Condition {
        return conditions.reduce(
            (acc, item) => new Or(acc, item),
            new Or(cond1, cond2)
        ) as Condition;
    }

    /* Comparators */

    eq(identifier: string, value: POJO): Comparison {
        return new Equals(this.variable(identifier), this.value(value));
    }
    
    neq(identifier: string, value: POJO): Comparison {
        return new NotEquals(this.variable(identifier), this.value(value));
    }
    
    lt(identifier: string, value: POJO): Comparison {
        return new LessThan(this.variable(identifier), this.value(value));
    }
    
    lte(identifier: string, value: POJO): Comparison {
        return new LessThanEquals(this.variable(identifier), this.value(value));
    }
    
    gt(identifier: string, value: POJO): Comparison {
        return new GreaterThan(this.variable(identifier), this.value(value));
    }
    
    like(identifier: string, value: POJO): Comparison {
        return new Like(this.variable(identifier), this.value(value));
    }
    
    isNull(identifier: string): Comparison {
        return new IsNull(this.variable(identifier));
    }
    
    isNotNull(identifier: string): Comparison {
        return new IsNotNull(this.variable(identifier));
    }
    
    isEmpty(identifier: string): Comparison {
        return new IsEmpty(this.variable(identifier));
    }

    isNotEmpty(identifier: string): Comparison {
        return new IsNotEmpty(this.variable(identifier));
    }
    
    in(identifier: string, array: POJO[]): Comparison {
        return new In(this.variable(identifier), this.array(...array));
    }

    notIn(identifier: string, array: POJO[]): Comparison {
        return new NotIn(this.variable(identifier), this.array(...array));
    }

    /* Functions & Variables */

    function(identifier: string, ...parameters: (POJO | Variable)[]): Function {
        const paramNodes = parameters.map(
            (param) => param instanceof Variable ? param : this.value(param)
        );
        return new Function(identifier, ...paramNodes);
    }

    variable(identifier: string): Variable {
        if (keywords.includes(identifier)) {
            throw new Error(`The name "${identifier}" is a reserved keyword and cannot be used as a variable identifier.`);
        }
        return new VariableNode(identifier);
    }

    /* Helper Methods*/
    
    protected array(...items: POJO[]): Array<Value> {
        const mappedItems = items.map((item) => this.value(item));
        return new Array(...mappedItems);
    }

    protected value(value: POJO): Value {
        if (value == null) {
            return new Null();
        }
        switch (typeof value) {
            case 'boolean':
                return new Boolean(value);
            case 'number':
                return new Number(value);
            case 'string':
                return new String(value);
        }
    }

}

export default Builder;