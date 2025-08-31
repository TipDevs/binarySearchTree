class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }
  buildTree(array) {
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this.#buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);
  }
  #buildTree(arr, start, end) {
    // Private method implemented to build tree behind the scene and prevent external access
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);
    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);
    return root;
  }
  insert(value) {
    this.root = this.#insert(this.root, value);
  }
  #insert(root, value) {
    // Private method implemented to insert new Node to the tree behind the scene and prevent external access
    if (root === null) return new Node(value);
    if (root.data === value) return root;
    if (value < root.data) root.left = this.#insert(root.left, value);
    else if (value > root.data) root.right = this.#insert(root.right, value);
    return root;
  }
  deleteItem(value) {
    this.root = this.#deleteItem(this.root, value);
  }
  #deleteItem(root, value) {
    // Private method implemented to delete a node from the tree behind the scene and prevent external access
    let current = root;
    let prev = null;
    while (current !== null && current.data !== value) {
      prev = current;
      if (value < current.data) current = current.left;
      else current = current.right;
    }
    if (current === null) return root;
    if (current.left === null || current.right === null) {
      let newCurrent = current.left === null ? current.right : current.left;
      if (prev === null) return newCurrent;
      if (current === prev.left) prev.left = newCurrent;
      else prev.right = newCurrent;
    } else {
      let prev = null;
      let tempVar = current.right;
      while (tempVar.left !== null) {
        prev = tempVar;
        tempVar = tempVar.left;
      }
      if (prev !== null) p.left = tempVar.right;
      else current.right = tempVar.right;
      current.data = tempVar.data;
    }
    return root;
  }
  find(value) {
    const result = this.#find(this.root, value);
    return result;
  }
  #find(root, value) {
    // Private method implemented to find a node in a tree behind the scene and prevent external access
    let current = root;
    while (current !== null) {
      if (current.data === value) {
        return current;
      }
      if (value < current.data) current = current.left;
      else if (value > current.data) current = current.right;
    }
    return null;
  }
}
