## Constants

<dl>
<dt><a href="#CryoInput">CryoInput</a></dt>
<dd><p>Creates input, but very fancy with lot of cool stuff there, you can use very advanced inputs</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#CryoForm">CryoForm(successFuncJson, successFuncFormData, failedFunc, children, form)</a></dt>
<dd><p>Creates Form that can be filled, saved very easilly with realtime input checking.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#InputRules">InputRules</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="CryoInput"></a>

## CryoInput
Creates input, but very fancy with lot of cool stuff there, you can use very advanced inputs

**Kind**: global constant  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| defaultValue | <code>string</code> | Default value means that input will save value to state only at start, lot of times it's enough. |
| value | <code>string</code> | Operates with state whole time. |
| onChange | <code>function</code> | Is called when input changed. |
| label | <code>string</code> | Label is something like title, visible even when input is filled. |
| placeholder | <code>string</code> | Classic placeholder like in HTML. |
| name | <code>string</code> | Very important and will be used as object property while saving to JSON. |
| description | <code>string</code> | Small text for user, can be filled with some instruction or whatever. |
| type | <code>string</code> | This input don't support all types, some of the types must be set in rules, allowed types are text, password, textarea, richtext, file |
| rows | <code>number</code> | Is used when input type is textarea |
| rules | [<code>Array.&lt;InputRules&gt;</code>](#InputRules) | For example rules={[{required: true, errorMessage: 'This input muset be filled'}, {...}]} |
| autoComplete | <code>string</code> | You can set autoComplete='off'. |
| inputProps | <code>props</code> | Custom props of input. |
| errorMessProps | <code>props</code> | Custom props of error message. |
| descriptionProps | <code>props</code> | Custom props of description component. |
| onNotValidChange | <code>function</code> | Function called when change is not valid. |
| onValidChange | <code>function</code> | Function called when change is valid. |
| fileInputRightSideText | <code>string</code> | Text in file input on right side. |
| disallowFormGroup | <code>bool</code> | Removes class with bottom margin. |
| quillModules | <code>quillProps</code> | Set custom props to quill richtext editor |

**Example**  
```js
return ( <CryoInput label="Name" placeholder="name" name="name"  /> )
```
<a name="CryoForm"></a>

## CryoForm(successFuncJson, successFuncFormData, failedFunc, children, form)
Creates Form that can be filled, saved very easilly with realtime input checking.

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| successFuncJson | <code>function</code> | Function called when inputs are OK and send there json as first parameter. Example: (json) => {success(json)} |
| successFuncFormData | <code>function</code> | Function called when inputs are OK and send there FormData as first parameter. Example: (formData) => {success(formData)} |
| failedFunc | <code>failedFunc</code> | Function called when form is filled wrong and send there error detail as first parameter |
| children | <code>component</code> | Children means component inside like this <CryoForm>...Children...</CryoForm> |
| form | <code>cryoFormState</code> | This uses our own hook, you can create that hook like this: const [form] = cryoUseForm(); |

**Example**  
```js
const [form] = cryoUseForm();const success = (json) => { form.clearInputs(); console.log(json.name);}return ( <Form successFuncJson={success}>     <CryoInput label="Name" placeholder="name" name="name"  />  </Form>)
```
<a name="InputRules"></a>

## InputRules : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| errorMessage | <code>string</code> | 
| required | <code>bool</code> | 
| minLength | <code>number</code> | 
| maxLength | <code>number</code> | 
| type | <code>&quot;email&quot;</code> \| <code>&quot;number&quot;</code> | 

