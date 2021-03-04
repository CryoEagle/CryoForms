import React from 'react';

const Toolbar = () => {
    const format = (com, val) => {
        document.execCommand(com, false, val);
    }

    const addLink = () => {
        const show = document.getElementById('url-input');
        if (show.classList.contains('hidden')) {
          show.classList.remove('hidden');
        } else {
          show.classList.add('hidden');
        }
    }
    
    const setUrl = () => {
        e.preventDefault()
        const url = document.getElementById('txtFormatUrl').value;
        const show = document.getElementById('url-input');
        const text = document.getSelection();
        format(
            'insertHTML', 
            `<a href='${url}' target='_blank'>${text}
            </a>`
        );
        document.getElementById('txtFormatUrl').value = '';
        show.classList.add('hidden');
    }
    
    const setHeader = () => {
        const target = document.getSelection();
        format('insertHTML', `<h2>${target}</h2>`);
    }

    const addLineAfterBlock = (id) => {
        const block = document.getElementById(`${id}`);
        const div = document.createElement('div');
        const br = document.createElement('br');
        div.appendChild(br);
        
        if (!block) {
            return;
        } else {
            block.after(div);
        }
    }

    const addCodeBlock = () => {
        const codeBlock = document.createElement('pre');
        const target = document.getSelection();
        if (
          target.focusNode.nodeName.includes('#text') ||
          target.focusNode.classList.contains('title') ||
          target.focusNode.className.includes('codeBlock')
        ) {
          return
        }
        const id = `codeBlock-${
          document.getElementsByClassName('codeBlock').length + 1
        }`;
        codeBlock.classList.add('codeBlock')
       
        format(
          'insertHTML',
          `<pre class='codeBlock' id='${id}'>${target}</pre>`
        ); 
        addLineAfterBlock(id)
    }

    return (
        <div className='toolbar'>
            <button type='button' onClick={e => format('bold')}>Bold</button>
            <button onClick={e => format('italic')}>Italics</button>
            <button 
                onClick={e =>
                    format('insertUnorderedList')
                }
            >
                List
            </button>
            <button onClick={e => addLink()}>Link</button>
            <div id='url-input' className='hidden'>
                <input id='txtFormatUrl' placeholder='url'/>
                <button onClick={e => setUrl(e)}>Create Link</button>
            </div>
            <button onClick={e => setHeader()}>Header</button>
            <button onClick={e => addCodeBlock()}>CodeBlock</button>
            <button onClick={e => handleSubmit()}>Submit</button>
        </div>
    )
}

export default Toolbar;