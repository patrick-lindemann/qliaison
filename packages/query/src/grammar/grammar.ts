// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

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

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": (d) => d.join('')},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "start", "symbols": ["_", "condition", "_", {"literal":";"}], "postprocess": root},
    {"name": "condition", "symbols": ["comparison"], "postprocess": id},
    {"name": "condition", "symbols": ["condition", "_", "logical_operator", "_", "not_operation"], "postprocess": binaryOperation},
    {"name": "condition", "symbols": ["condition", "_", "logical_operator", "_", "comparison"], "postprocess": binaryOperation},
    {"name": "logical_operator$subexpression$1", "symbols": [/[aA]/, /[nN]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "logical_operator", "symbols": ["logical_operator$subexpression$1"], "postprocess": operator('and')},
    {"name": "logical_operator$subexpression$2", "symbols": [/[oO]/, /[rR]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "logical_operator", "symbols": ["logical_operator$subexpression$2"], "postprocess": operator('or')},
    {"name": "not_operation", "symbols": ["not_operator", "_", "comparison"], "postprocess": unaryOperation},
    {"name": "not_operation", "symbols": ["not_operator", "_", "condition"], "postprocess": unaryOperation},
    {"name": "not_operator$subexpression$1", "symbols": [/[nN]/, /[oO]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "not_operator", "symbols": ["not_operator$subexpression$1"], "postprocess": operator('not')},
    {"name": "comparison", "symbols": ["variable", "_", "comparison_operator", "_", "value"], "postprocess": binaryOperation},
    {"name": "comparison", "symbols": ["variable", "_", "in_operator", "_", "array"], "postprocess": binaryOperation},
    {"name": "comparison", "symbols": [{"literal":"("}, "_", "condition", "_", {"literal":")"}], "postprocess": nth(2)},
    {"name": "comparison_operator", "symbols": [{"literal":"="}], "postprocess": operator('eq')},
    {"name": "comparison_operator$string$1", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$1"], "postprocess": operator('neq')},
    {"name": "comparison_operator", "symbols": [{"literal":"<"}], "postprocess": operator('lt')},
    {"name": "comparison_operator$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$2"], "postprocess": operator('lte')},
    {"name": "comparison_operator", "symbols": [{"literal":">"}], "postprocess": operator('gt')},
    {"name": "comparison_operator$string$3", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": (d) => d.join('')},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$3"], "postprocess": operator('gte')},
    {"name": "comparison_operator", "symbols": [{"literal":"~"}], "postprocess": operator('like')},
    {"name": "comparison_operator$string$4", "symbols": [{"literal":"!"}, {"literal":"~"}], "postprocess": (d) => d.join('')},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$4"], "postprocess": operator('not_like')},
    {"name": "comparison_operator$string$5", "symbols": [{"literal":"~"}, {"literal":"~"}], "postprocess": (d) => d.join('')},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$5"], "postprocess": operator('i_like')},
    {"name": "comparison_operator$string$6", "symbols": [{"literal":"!"}, {"literal":"~"}, {"literal":"~"}], "postprocess": (d) => d.join('')},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$6"], "postprocess": operator('not_i_like')},
    {"name": "in_operator$subexpression$1", "symbols": [/[iI]/, /[nN]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "in_operator", "symbols": ["in_operator$subexpression$1"], "postprocess": operator('in')},
    {"name": "in_operator$subexpression$2", "symbols": [/[nN]/, /[oO]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "in_operator$subexpression$3", "symbols": [/[iI]/, /[nN]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "in_operator", "symbols": ["in_operator$subexpression$2", "__", "in_operator$subexpression$3"], "postprocess": operator('not_in')},
    {"name": "variable", "symbols": ["selector"], "postprocess": id},
    {"name": "variable", "symbols": ["function"], "postprocess": id},
    {"name": "selector", "symbols": ["identifier"], "postprocess": selector},
    {"name": "selector", "symbols": ["identifier", {"literal":"."}, "selector"], "postprocess": join},
    {"name": "identifier$ebnf$1", "symbols": []},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-zA-Z0-9_\-$]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "identifier", "symbols": [/[a-zA-Z_$]/, "identifier$ebnf$1"], "postprocess": identifier},
    {"name": "function", "symbols": ["identifier", "_", {"literal":"("}, "_", "listing", "_", {"literal":")"}], "postprocess": fn},
    {"name": "array", "symbols": [{"literal":"["}, "_", "listing", "_", {"literal":"]"}], "postprocess": array},
    {"name": "listing", "symbols": [], "postprocess": () => []},
    {"name": "listing", "symbols": ["value"], "postprocess": listing},
    {"name": "listing", "symbols": ["value", "_", {"literal":","}, "_", "listing"], "postprocess": listing},
    {"name": "value", "symbols": ["literal"], "postprocess": id},
    {"name": "value", "symbols": ["function"], "postprocess": id},
    {"name": "literal", "symbols": ["nul"], "postprocess": id},
    {"name": "literal", "symbols": ["boolean"], "postprocess": id},
    {"name": "literal", "symbols": ["number"], "postprocess": id},
    {"name": "literal", "symbols": ["string"], "postprocess": id},
    {"name": "nul$subexpression$1", "symbols": [/[nN]/, /[uU]/, /[lL]/, /[lL]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "nul", "symbols": ["nul$subexpression$1"], "postprocess": nul},
    {"name": "boolean$subexpression$1", "symbols": [/[tT]/, /[rR]/, /[uU]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "boolean", "symbols": ["boolean$subexpression$1"], "postprocess": boolean},
    {"name": "boolean$subexpression$2", "symbols": [/[fF]/, /[aA]/, /[lL]/, /[sS]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "boolean", "symbols": ["boolean$subexpression$2"], "postprocess": boolean},
    {"name": "number$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "number$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "number$ebnf$1", "symbols": ["number$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "number$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "number$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$2", "symbols": ["number$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "number", "symbols": ["number$ebnf$1", "number$ebnf$2"], "postprocess": integer},
    {"name": "number$ebnf$3", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "number$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "number$ebnf$4", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$4", "symbols": ["number$ebnf$4", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "number$ebnf$5", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$5", "symbols": ["number$ebnf$5", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "number", "symbols": ["number$ebnf$3", "number$ebnf$4", {"literal":"."}, "number$ebnf$5"], "postprocess": float},
    {"name": "string", "symbols": ["dqstring"], "postprocess": string},
    {"name": "string", "symbols": ["sqstring"], "postprocess": string}
  ],
  ParserStart: "start",
};

export default grammar;
