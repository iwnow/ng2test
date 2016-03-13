/**@ experimental  */
export function Log() {
    return function(target: any, name: string, descriptor: any) {
        console.log(`[calling]:${target.constructor.name}.${name}`);
        console.dir(arguments);
        return descriptor;      
    };
};