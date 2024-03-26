import { DocumentPreview } from "@cms/types";
import { Queue } from "@cms/utils";

class Node {
  constructor(
    public character: string = "$",
    public document: DocumentPreview | null = null,
    public children: { [key: string]: Node } = {}
  ) {}
}

class SearchStore {
  public static readonly instance = new SearchStore();

  private root: Node;

  private constructor() {
    this.root = new Node();
  }

  public init(documents: DocumentPreview[]) {
    this.root = new Node();

    documents.forEach(this.addDocument.bind(this));
  }

  public addDocument(document: DocumentPreview) {
    const identifier = document.identifier.toLowerCase();

    let node = this.root;
    let index = 0;

    while (index < identifier.length && node.children[identifier[index]]) {
      node = node.children[identifier[index++]];
    }

    while (index < identifier.length) {
      const child = new Node(identifier[index]);
      node.children[identifier[index]] = child;
      node = child;
      index++;
    }

    node.document = document;
  }

  public getDocuments(query: string) {
    query = query.toLowerCase();

    let node = this.root;
    let index = 0;

    while (index < query.length && node.children[query[index]]) {
      node = node.children[query[index++]];
    }

    if (index < query.length) {
      return [];
    }

    const documents: DocumentPreview[] = [];
    const nodes = new Queue<Node>();
    nodes.add(node);

    while (!nodes.isEmpty) {
      node = nodes.remove()!;
      if (node.document) {
        documents.push(node.document);
      }

      for (const child of Object.values(node.children)) {
        nodes.add(child);
      }
    }

    return documents;
  }

  public removeDocument(query: string) {
    query = query.toLowerCase();

    let node = this.root;
    let index = 0;

    const seenNodes: Node[] = [];

    while (index < query.length && node.children[query[index]]) {
      seenNodes.push(node);
      node = node.children[query[index++]];
    }

    // Reset the document preview at this node since it's deleted now
    node.document = null;

    if (Object.keys(node.children).length > 0) {
      return;
    }

    while (seenNodes.length > 1 && !seenNodes[seenNodes.length - 1].document) {
      const currentNode = seenNodes.pop()!;
      const parentNode = seenNodes[seenNodes.length - 1];

      delete parentNode.children[currentNode.character];
    }
  }
}

export const searchStore = SearchStore.instance;
