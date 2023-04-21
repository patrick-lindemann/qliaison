import { Root } from 'base/ast';
import { Parser } from 'base/parser';
import { grammar } from 'grammar';
import { Grammar, Parser as NearleyParser } from 'nearley';

export class QueryStringParser extends Parser<string> {
  protected _grammar: Grammar;

  constructor() {
    super();
    this._grammar = Grammar.fromCompiled(grammar);
  }

  parse(input: string): Root {
    const parser = new NearleyParser(this._grammar);
    parser.feed(input);
    return parser.results[0] as Root;
  }
}
