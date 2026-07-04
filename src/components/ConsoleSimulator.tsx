import React from 'react';
import { Pattern } from '../data/types';
import { Terminal } from 'lucide-react';

interface ConsoleSimulatorProps {
  pattern: Pattern;
}

export const ConsoleSimulator: React.FC<ConsoleSimulatorProps> = ({ pattern }) => {
  return (
    <div className="bento-card card-console">
      <div className="card-header">
        <Terminal />
        <span>Consola (Ejecución Simulada)</span>
      </div>
      
      <div className="console-header">
        <span className="console-dot dot-red"></span>
        <span className="console-dot dot-yellow"></span>
        <span className="console-dot dot-green"></span>
      </div>

      <div className="console-box">
        {pattern.output}
      </div>
    </div>
  );
};
