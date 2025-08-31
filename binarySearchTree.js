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
}
