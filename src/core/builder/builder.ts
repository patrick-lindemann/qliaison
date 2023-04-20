import { And, Array, BinaryOperation, Boolean, Comparison, Condition, Empty, Equals, Function, GreaterThan, In, Is, IsNot, LessThan, LessThanEquals, Like, Not, NotEquals, NotIn, Null, Number, Or, Root, String, UnaryOperation, Value, Variable, keywords } from 'core/ast';

/* Types */

export type NativeValue = null | boolean | number | string;
export type Any = Comparison | Condition | Function | Variable | Array | Value;

/* Classes */

export class Builder {

    /* Methods */

    root(expr: Condition | Comparison): Root {
        return new Root(expr);
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

    eq(identifier: string, value: NativeValue): Comparison {
        return new Equals(this.variable(identifier), this._value(value));
    }
    
    neq(identifier: string, value: NativeValue): Comparison {
        return new NotEquals(this.variable(identifier), this._value(value));
    }
    
    lt(identifier: string, value: NativeValue): Comparison {
        return new LessThan(this.variable(identifier), this._value(value));
    }
    
    lte(identifier: string, value: NativeValue): Comparison {
        return new LessThanEquals(this.variable(identifier), this._value(value));
    }
    
    gt(identifier: string, value: NativeValue): Comparison {
        return new GreaterThan(this.variable(identifier), this._value(value));
    }
    
    like(identifier: string, value: NativeValue): Comparison {
        return new Like(this.variable(identifier), this._value(value));
    }
    
    is(identifier: string, value: 'null' | 'empty'): Comparison {
        return new Is(
            this.variable(identifier),
            value == 'null' ? new Null() : new Empty()
        );
    }
    
    isNot(identifier: string, value: 'null' | 'empty'): Comparison {
        return new IsNot(
            this.variable(identifier),
            value == 'null' ? new Null() : new Empty()
        );
    }

    in(identifier: string, array: NativeValue[]): Comparison {
        return new In(this.variable(identifier), this._array(...array));
    }

    notIn(identifier: string, array: NativeValue[]): Comparison {
        return new NotIn(this.variable(identifier), this._array(...array));
    }

    /* Functions & Variables */

    function(identifier: string, ...parameters: (NativeValue | Variable)[]): Function {
        const paramNodes = parameters.map(
            (param) => param instanceof Variable ? param : this._value(param)
        );
        return new Function(identifier, paramNodes);
    }

    variable(identifier: string): Variable {
        if (keywords.includes(identifier)) {
            throw new Error(`The name "${identifier}" is a reserved keyword and cannot be used as a variable identifier.`);
        }
        return new Variable(identifier);
    }

    /* Helper Functions */
    
    _unaryOperation(operator: string, value: Any): UnaryOperation {
        return new UnaryOperation(operator, value);
    }

    _binaryOperation(operator: string, left: Any, right: Any): BinaryOperation {
        return new BinaryOperation(operator, left, right);
    }

    _array(...items: NativeValue[]): Array<Value> {
        const mappedItems = items.map((item) => this._value(item));
        return new Array(mappedItems);
    }

    _value(value: NativeValue): Value {
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