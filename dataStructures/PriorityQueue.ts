type PriorityData = {
    val: string;
    priority: number;
}

/**
 * Priority Queue represented as a min binary heap
 */
class PriorityQueue {
    public values: PriorityData[] = [];

    public enqueue(value: PriorityData) {
        this.values.push(value);

        this.bubbleUp(this.values.length - 1);
    }

    public dequeue(): void {
        this.values[0] = this.values[this.values.length - 1];
        this.values.pop();

        this.sinkDown();
    }

    private bubbleUp(index = this.values.length - 1): void {
        const node = this.values[index];
        // round down to nearest odd number and divide by 2 to get index of parent node
        const parentIndex = ((index % 2 === 0 ? index - 1 : index) - 1) / 2
        const parent = this.values[parentIndex];

        // if parent priority is less than current priority or index is 0 (root node), stop bubbling up
        if (index === 0 || parent.priority < node.priority) {
            return;
        }

        // if parent priority is greater than new priority, swap those nodes
        if (parent.priority > node.priority) {
            this.values[parentIndex] = node;
            this.values[index] = parent;
        }

        return this.bubbleUp(parentIndex);
    }

    private sinkDown(index = 0): void {
        const node = this.values[index];

        const leftChildIndex = (2 * index) + 1;
        const leftChild = this.values[leftChildIndex];

        const rightChildIndex = leftChildIndex + 1;
        const rightChild = this.values[rightChildIndex];

        // if no children, leave node at current position
        if (leftChild === undefined && rightChild === undefined) {
            return;
        }

        // check if left child priority is less than right child
        const isLeftChildLower = (rightChild === undefined) || (leftChild.priority < rightChild.priority);

        const smallestChild = (isLeftChildLower ? leftChild : rightChild);
        const smallestChildIndex = (isLeftChildLower ? leftChildIndex : rightChildIndex);

        // if greatest child priority is larger than current node's priority, swap nodes
        if (smallestChild.priority < node.priority && smallestChild !== undefined) {
            this.values[smallestChildIndex] = node;
            this.values[index] = smallestChild;

            return this.sinkDown(smallestChildIndex);
        } else {
            // if neither child is greater, leave node at new current location
            return;
        }
    }
}

const myPriorityQueue = new PriorityQueue();

myPriorityQueue.enqueue({ priority: 1, val: "dying" });
myPriorityQueue.enqueue({ priority: 4, val: "cold" });
myPriorityQueue.enqueue({ priority: 3, val: "somewhat dying" });
myPriorityQueue.enqueue({ priority: 5, val: "flu" });
myPriorityQueue.enqueue({ priority: 2, val: "flu 2.0" });

myPriorityQueue.dequeue();

console.log(myPriorityQueue.values);