import React, {useContext} from 'react';
import { CopyBlock, dracula, nord, monokai, irBlack, hopscotch } from 'react-code-blocks';
import { Resizable } from 're-resizable';
import { AppContext } from '../../src/'

export const CodeTab = () => {
  /// use hook to check the current elements dropped on canva 
  const { listOfDroppedElements }: any = useContext(AppContext);
  // get all output strings in an array
  const injectFunc = (listofDraggableElements:any) => {
    const result = [];
    for(let obj of listOfDroppedElements) {
      result.push(obj.data);
    }
    return result
  }


  //display each output string on a separate line in right order
  const componentResults = injectFunc(listOfDroppedElements);
  let cleanedUpResults = ``;
  for (const each of componentResults) {
    cleanedUpResults += `\n\t` + each;
  } 

  const parse = `import React from "react";
import { useForm } from "react-hook-form";
  

  export default function App() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>${cleanedUpResults}
      </form>
    );
  };`

  return (
    <Resizable
      defaultSize={{
      width: 370,
      height: 500,
      }}
    >
      <div className = 'output'>
          <CopyBlock
            text={parse}
            showLineNumbers={true}
            codeBlock
            language="typescript"
            theme={dracula}
            customStyle={{
              overflowY: 'scroll',
              minWidth: '360',
              maxHeight: '765',
            }}
          />
          </div>
  </Resizable>
  );
}