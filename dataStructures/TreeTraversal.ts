class TraversalTree<T> extends BinarySearchTree<T> {
    public BFS(queryValue: T) {
        if (!this.root) {
            return [];
        }

        let node: TreeNode<T> | null | undefined = this.root;
        const queue: TreeNode<T>[] = [node];

        while (queue.length) {
            // grab next node in queue
            node = queue.shift();

            if (node?.value === queryValue) {
                return node;
            }

            // push any available left & right nodes to queue
            node?.left && queue.push(node.left);
            node?.right && queue.push(node.right);
        }

        return null;
    }

    public DFSPreorder() {
        const visited: TreeNode<T>[] = [];

        const traverseTree = (node: TreeNode<T> | null) => {
            if (!node) {
                return null;
            }

            visited.push(node);

            node.left && traverseTree(node.left);
            node.right && traverseTree(node.right);
        }

        traverseTree(this.root);

        return visited;
    }

    public DFSPostOrder() {
        const visited: TreeNode<T>[] = [];

        const traverseTree = (node: TreeNode<T> | null) => {
            if (!node) {
                return null;
            }
            
            node.left && traverseTree(node.left);
            node.right && traverseTree(node.right);

            visited.push(node);
        }

        traverseTree(this.root);

        return visited;
    }
}

const myTravTree = new TraversalTree();

myTravTree.insert(10);
myTravTree.insert(6);
myTravTree.insert(3);
myTravTree.insert(8);
myTravTree.insert(15);
myTravTree.insert(20);

console.log(myTravTree.BFS(8));
console.log(myTravTree.DFSPreorder());

console.log(myTravTree);