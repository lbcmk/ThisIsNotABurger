var topping = [];
export var total_toppings = 6

export function chooseTopping(x, y) {
  switch(x) {
      default:
          topping[y] = "Unknown";
      case 0: topping[y] = "assets/toppings/avocado.gltf"; break;
      case 1: topping[y] = "assets/toppings/bacon.gltf"; break;
      case 2: topping[y] = "assets/toppings/cheese.gltf"; break;
      case 3: topping[y] = "assets/toppings/egg.gltf"; break;
      case 4: topping[y] = "assets/toppings/lettuce.gltf"; break;
      case 5: topping[y] = "assets/toppings/mushroom.gltf"; break;
      case 6: topping[y] = "assets/toppings/onion.gltf"; break;
  }
  return topping
}