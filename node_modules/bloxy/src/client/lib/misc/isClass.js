

module.exports = function (obj, compareClass) {
	let objType = typeof(obj);


	if (objType === "object") {
		if (Array.isArray(obj) && !Array.isArray(compareClass)) {
			// Is an array
			return (obj.every(x=>x instanceof compareClass));

		} else if (Array.isArray(obj) && Array.isArray(compareClass)) {
			return (obj.every(x=>compareClass.some(y=> x instanceof y)));
		} else if (!Array.isArray(obj) && Array.isArray(compareClass)) {
			return (compareClass.some(x=>obj instanceof x));
		} else if (!(obj instanceof compareClass)) {    
			// Is an object

			if (!Array.isArray(compareClass)) {
				return (Object.keys(obj).every(k=>obj[k] instanceof compareClass));
			} else {
				return (Object.keys(obj).every(k=>(compareClass.some(toC => obj[k] instanceof toC))));
			}
		} else {
			return (obj instanceof compareClass);
		}
	} else return false;
};