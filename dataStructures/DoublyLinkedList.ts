type TNodeValue = {

}

class ListNode {
    public value: TNodeValue;
    public prev: ListNode | null = null;
    public next: ListNode | null = null;

    constructor(value: TNodeValue) {
        this.value = value;
    }
}

class DoublyLinkedList {
    public head: ListNode | null = null;
    public tail: ListNode | null = null;
    public length = 0;

    constructor() {

    }

    public insert = (value: TNodeValue, index: number) => {
        const nodeInPlace = this.getNode(index);
        const newNode = new ListNode(value);

        if (index === 0) {
            return this.unshift(value);
        } else if (index === this.length) {
            return this.push(value);
        } else if (nodeInPlace) {
            const prevNode = nodeInPlace.prev;

            if (!prevNode) {
                return false;
            }

            prevNode.next = newNode;
            newNode.prev = prevNode;

            newNode.next = nodeInPlace;
            nodeInPlace.prev = newNode;

            return true;
        }

        return false;
    }

    public push = (value: TNodeValue) => {
        const newNode = new ListNode(value);

        if (!this.head || !this.tail) {
            this.setFirstNode(newNode);
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.increment();

        return true;
    }

    public unshift = (value: TNodeValue) => {
        const newNode = new ListNode(value);

        if (!this.head || !this.tail) {
            this.setFirstNode(newNode);
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }

        this.increment();

        return true;
    }

    public setFirstNode = (node: ListNode) => {
        this.head = node;
        this.tail = node;
    }

    private increment = () => {
        this.length++;

        return true;
    }

    private decrement = () => {
        this.length--;

        return true;
    }

    public getNode = (queryIndex: number) => {
        if (queryIndex > this.length || queryIndex < 0 || !this.tail || !this.head) {
            return undefined;
        }

        const startFromTail = queryIndex > this.length / 2;

        const getNextNode = (node: null | ListNode, index: number): ListNode | undefined => {
            if (!node) {
                return undefined;
            } else if (index === queryIndex) {
                return node;
            }

            return getNextNode(startFromTail ? node.prev : node.next, startFromTail ? index - 1 : index + 1);
        }

        return getNextNode(startFromTail ? this.tail : this.head, startFromTail ? this.length : 0);
    }

    public pop = () => {
        const node = this.tail;

        if (this.length === 0) {
            return null;
        }

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else if (node && node.prev) {
            node.prev 
        }
        
        this.decrement();

        return node;
    }

    public print = (node = this.head) => {
        node && console.log(node.value);
        node?.next && this.print(node.next);
    }
}

const myList = new DoublyLinkedList();

myList.insert(0, 0);
myList.insert(1, 1);
myList.insert(2, 2);

myList.unshift(3);
myList.insert(4, 0);

myList.insert(5, 1);
myList.insert(6, 4);

myList.print();