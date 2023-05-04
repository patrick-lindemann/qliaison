@preprocessor typescript

@builtin "string.ne"
@builtin "whitespace.ne"

# Grammar definition for the sequelize language parser
# https://nearley.js.org/
# Commands:
#  Compile: `nearleyc "./grammar.ne" -o "./grammar.ts"`
#  Generate Diagram: `nearley-railroad "./grammar.ne" -o "./grammar-diagram.html"`

@{%
import {
    root, 
    operator,
    unaryOperation,
    binaryOperation,
    selector,
    fn,
    identifier,
    array,
    listing,
    _null,
    boolean,
    integer,
    float,
    string,
    join,
    nth
} from './processor';
%}

main -> _ condition _ {% root %}

condition
    -> comparison                                  {% id %}
    |  condition __ logical_operator __ comparison {% binaryOperation %}
    |  not_operator __ condition                   {% unaryOperation %}

not_operator
    -> "not"i {% operator('not') %}

logical_operator
    -> "and"i {% operator('and') %}
    |  "or"i  {% operator('or') %}

comparison
    -> variable _ comparison_operator _ literal {% binaryOperation %}
    |  variable __ in_operator __ array         {% binaryOperation %}
    |  "(" _ condition _ ")"                    {% nth(2) %}

comparison_operator
    -> "="  {% operator('eq') %}
    |  "!=" {% operator('neq') %}
    |  "<"  {% operator('lt') %}
    |  "<=" {% operator('lte') %}
    |  ">"  {% operator('gt') %}
    |  ">=" {% operator('gte') %}
    |  "~"  {% operator('like') %}

in_operator
    -> "in"i           {% operator('in') %}
    |  "not"i __ "in"i {% operator('not_in') %}

variable
    -> selector {% id %}
    |  function {% id %}

selector
    -> identifier              {% selector %}
    |  identifier "." selector {% join %}

identifier
    -> [a-zA-Z_$] [a-zA-Z0-9_\-$]:* {% identifier %}

function
    -> identifier _ "(" _ listing _ ")" {% fn %}

array
    -> "[" _ listing _ "]" {% array %}

listing
    -> null                     {% () => [] %}
    |  literal                  {% id %}
    |  literal _ "," _ listing  {% listing %}

literal
    -> _null_  {% id %}
    |  boolean {% id %}
    |  number  {% id %}
    |  string  {% id %}

_null_
    -> "null"i {% _null %}

boolean
    -> "true"i  {% boolean %}
    |  "false"i {% boolean %}

number
    -> ("-"|"+"):? [0-9]:+       {% integer %}
    |  "-":? [0-9]:+ "." [0-9]:+ {% float %}

string
    -> dqstring {% string %}
    |  sqstring {% string %}