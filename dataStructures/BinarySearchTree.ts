class TreeNode<T> {
    public left: TreeNode<T> | null = null;
    public right: TreeNode<T> | null = null;
    public value: T;

    constructor(value: T) {
        this.value = value;
    }
}

class BinarySearchTree<T> {
    protected root: TreeNode<T> | null = null;

    public insert (value: T) {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;

            return newNode;
        }

        const traverseTree = (node: TreeNode<T> | null): TreeNode<T> | null => {
            if (!node) {
                return null;
            } else if (value < node.value) {
                if (!node.left) {
                    node.left = newNode;
                } else {
                    return traverseTree(node.left);
                }
            } else if (value > node.value) {
                if (!node.right) {
                    node.right = newNode;
                } else {
                    return traverseTree(node.right);
                }
            } else {
                console.log("same value as another node");
                return null;
            }

            return newNode;
        }

        return traverseTree(this.root);
    }

    public find (value: T) {
        
        const traverseTree = (node: TreeNode<T> | null): TreeNode<T> | null => {
            if (!node) {
                return null;
            } else if (node.value === value) {
                return node;
            } else if (value < node.value) {
                return traverseTree(node.left)
            } else {
                return traverseTree(node.right);
            }
        }

        return traverseTree(this.root);
    }
}

const myTree = new BinarySearchTree<number>();

myTree.insert(41);
myTree.insert(20);
myTree.insert(30);
myTree.insert(50);
myTree.insert(45);
myTree.insert(62);

// console.log(myTree.find(45));
// console.log(myTree.find(51));

// console.log(myTree);