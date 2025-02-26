// interface Point {
//   x: number;
//   y: number;
// }

// function logPoint(p: Point) {
//   console.log(p);
//   console.log(`${p.x}, ${p.y}`);
// }

// // logs "12, 26"
// const point = { x: 12, y: 26 };
// logPoint(point);

// const point3 = { x: 12, y: 26, z: 89 };
// logPoint(point3); // logs "12, 26"

// const rect = { x: 33, y: 3, width: 30, height: 80 };
// logPoint(rect); // logs "33, 3"
// function LogClass(constructor: Function) {
//   console.log(`Class created: ${constructor.name}`);
// }

// @LogClass
// class MyClass {
//   constructor() {
//     console.log("Instance created");
//   }
// }

// const myInstance = new MyClass();
// // Salida:
// // Class created: MyClass
// // Instance created
function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(descriptor);
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling method: ${propertyKey} with args: ${args}`);
    return originalMethod.apply(this, args);
  };
}

class MyClass {
  @LogMethod
  sayHello(name: string) {
    console.log(`Hello, ${name}!`);
  }
}

const myClassInstance = new MyClass();
myClassInstance.sayHello("Fernando");
// Salida:
// Calling method: sayHello with args: Fernando
// Hello, Fernando!
