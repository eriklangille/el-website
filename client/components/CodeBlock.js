import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {coy} from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = (props) => {

  return (
    <SyntaxHighlighter language={props.language} style={coy}>
      {props.value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;