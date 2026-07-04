import { Pattern } from './types';
import { singleton } from './patterns/creational/singleton';
import { builder } from './patterns/creational/builder';
import { factory } from './patterns/creational/factory';
import { abstractfactory } from './patterns/creational/abstractfactory';
import { prototype } from './patterns/creational/prototype';
import { objectpool } from './patterns/creational/objectpool';

import { adapter } from './patterns/structural/adapter';
import { composite } from './patterns/structural/composite';
import { decorator } from './patterns/structural/decorator';
import { facade } from './patterns/structural/facade';
import { proxy } from './patterns/structural/proxy';
import { bridge } from './patterns/structural/bridge';
import { flyweight } from './patterns/structural/flyweight';

import { chain } from './patterns/behavioral/chain';
import { command } from './patterns/behavioral/command';
import { interpreter } from './patterns/behavioral/interpreter';
import { iterator } from './patterns/behavioral/iterator';
import { mediator } from './patterns/behavioral/mediator';
import { memento } from './patterns/behavioral/memento';
import { observer } from './patterns/behavioral/observer';
import { state } from './patterns/behavioral/state';
import { strategy } from './patterns/behavioral/strategy';
import { template } from './patterns/behavioral/template';
import { visitor } from './patterns/behavioral/visitor';

export const patterns: Pattern[] = [
  // Creational
  singleton,
  builder,
  factory,
  abstractfactory,
  prototype,
  objectpool,

  // Structural
  adapter,
  composite,
  decorator,
  facade,
  proxy,
  bridge,
  flyweight,

  // Behavioral
  chain,
  command,
  interpreter,
  iterator,
  mediator,
  memento,
  observer,
  state,
  strategy,
  template,
  visitor
];
