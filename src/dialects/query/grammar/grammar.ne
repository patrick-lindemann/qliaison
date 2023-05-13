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
  nul,
  boolean,
  integer,
  float,
  string,
  join,
  nth
} from './processor';
%}

start -> _ condition _ ";" {% root %}

condition
    -> comparison                                 {% id %}
    |  condition _ logical_operator _ comparison  {% binaryOperation %}
    |  not_operator _ condition                   {% unaryOperation %}

not_operator
    -> "not"i {% operator('not') %}

logical_operator
    -> "and"i {% operator('and') %}
    |  "or"i  {% operator('or') %}

comparison
    -> variable _ comparison_operator _ value {% binaryOperation %}
    |  variable _ in_operator _ array         {% binaryOperation %}
    |  "(" _ condition _ ")"                  {% nth(2) %}

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
    -> null                   {% () => [] %}
    |  value                  {% id %}
    |  value _ "," _ listing  {% listing %}

value
    -> literal  {% id %}
    |  function {% id %}

literal
    -> nul     {% id %}
    |  boolean {% id %}
    |  number  {% id %}
    |  string  {% id %}

nul
    -> "null"i {% nul %}

boolean
    -> "true"i  {% boolean %}
    |  "false"i {% boolean %}

number
    -> ("-"|"+"):? [0-9]:+       {% integer %}
    |  "-":? [0-9]:+ "." [0-9]:+ {% float %}

string
    -> dqstring {% string %}
    |  sqstring {% string %}