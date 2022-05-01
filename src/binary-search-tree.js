const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

 
constructor() {
  this._node = null;
}

root() {
  return this._node
}

add( data ) {
  this._node = this.createNode(this._node, data)
}

createNode (node, data) {
  if (! node) {
    return new Node(data);  
  }
  if (node.data === data) {
    return node;
  }
  if (data < node.data) {
    node.left = this.createNode(node.left, data);
  } else {
    node.right = this.createNode(node.right, data);
  }

  return node;

}

searchNode(node, data) {
  if (!node) {
    return false
  }
  if (node.data === data) {
    return node
  }

  return data < node.data ?
    this.searchNode(node.left, data) :
    this.searchNode(node.right, data);

}


has(data) {
  if (this.searchNode(this._node, data)) {
    return true;
  } else {
    return false;
  }
}

find(data) {
  if (this.searchNode(this._node, data)) {
    return this.searchNode(this._node, data)
  } else {
    return null
  }
}


remove(data) {
  this._node = removeNode(this._node, data);

  function removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = removeNode(node.left, data);
      return node;
    } else if (node.data < data) {
      node.right = removeNode(node.right, data);
      return node;
    } else {
     
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        node = node.right;
        return node;
      }

      if (!node.right) {
        node = node.left;
        return node;
      }

      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.data;

      node.right = removeNode(node.right, minFromRight.data);

      return node;
    }
  }
  
}

min() {
  if (!this._node) {
    return null;
  }

  let node = this._node;
  while (node.left) {
    node = node.left;
  }

  return node.data;
}

max() {
  if (!this._node) {
    return null;
  }

  let node = this._node;
  while (node.right) {
    node = node.right;
  }

  return node.data;
}
}

module.exports = {
  BinarySearchTree
};