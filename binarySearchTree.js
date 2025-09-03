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
  #buildTree(array) {
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this.#buildTreeRecur(
      uniqueSortedArray,
      0,
      uniqueSortedArray.length - 1
    );
  }
  #buildTreeRecur(arr, start, end) {
    // Private method implemented to build tree behind the scene and prevent external access
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);
    root.left = this.#buildTreeRecur(arr, start, mid - 1);
    root.right = this.#buildTreeRecur(arr, mid + 1, end);
    return root;
  }
  prettyPrint() {
    const print = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
    print(this.root);
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
  levelOrderForEach(callBack) {
    if (typeof callBack !== "function") {
      throw new Error("a callback is required.");
    }
    if (this.root === null) return;
    let queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callBack(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
  inOrderForEach(callBack) {
    if (typeof callBack !== "function") {
      throw new Error("undefined is not a function.");
    }
    if (this.root === null) return;
    const stack = [];
    let current = this.root;
    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      callBack(current);
      current = current.right;
    }
  }
  preOrderForEach(callBack) {
    if (typeof callBack !== "function") {
      throw new Error("undefined is not a function.");
    }
    if (this.root === null) return;
    const stack = [this.root];
    while (stack.length > 0) {
      const node = stack.pop();
      callBack(node);
      if (node.right !== null) stack.push(node.right);
      if (node.left !== null) stack.push(node.left);
    }
  }
  postOrderForEach(callBack) {
    if (typeof callBack !== "function") {
      throw new Error("undefined is not a function.");
    }
    if (this.root === null) return;
    const stack1 = [this.root];
    const stack2 = [];
    while (stack1.length > 0) {
      const node = stack1.pop();
      if (node.left !== null) stack1.push(node.left);
      if (node.right !== null) stack1.push(node.right);
      stack2.push(node);
    }
    while (stack2.length !== 0) callBack(stack2.pop());
  }
  height(value) {
    function getHeight(node) {
      if (node === null) return -1;
      if (node.left === null && node.right === null) return 0;
      let leftHeight = getHeight(node.left);
      let rightHeight = getHeight(node.right);
      return 1 + Math.max(leftHeight, rightHeight);
    }
    let node = this.find(value);
    if (node === null) return null;
    return getHeight(node);
  }
}