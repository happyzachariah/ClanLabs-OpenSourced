## EasyData

A module created to save basic data easily and fast.


### Example

```JavaScript
const easydata = require('easydata');

let saver = new easydata(/* options */)

/* Options {
    compress: true | false -- Whether or not it should compress data saved, defaults to "true"
    ignoreErrors: true | false -- Will ignore errors, returns 'false' when doing .init() and null when using saving related methods, defaults to "true"
    name: 'Name of the data folder' -- The name of the data folder, default is ".data"
    path: '/path/to/where/the/data/folder/will/be -- (*Optional*) the path to where the data folder will be. Default is "./"
}*/


saver.init().then(async success=>{
    if (success) {
        await saver.save('myName', 'Martini');
        console.log(await saver.get('myName')) // --> Martini
    
        await saver.delete('myName')
        console.log(await saver.get('myName')) // --> null
    }
})
```

