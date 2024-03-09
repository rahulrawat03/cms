import { DocumentPreview } from "@cms/types";
import { Queue } from "@cms/utils";

class Node {
  constructor(
    public documents: DocumentPreview[] = [],
    public children: { [key: string]: Node } = {}
  ) {}
}

export class SearchStore {
  private root: Node;

  constructor() {
    this.root = new Node();
  }

  public init(documents: DocumentPreview[]) {
    this.root = new Node();

    documents.forEach(this.addDocument);
  }

  public addDocument = (document: DocumentPreview) => {
    const identifier = document.identifier;

    let node = this.root;
    let index = 0;

    while (index < identifier.length && node.children[identifier[index]]) {
      node = node.children[identifier[index++]];
    }

    while (index < identifier.length) {
      const child = new Node();
      node.children[identifier[index++]] = child;
      node = child;
    }

    node.documents.push(document);
  };

  public getDocuments(query: string) {
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
      documents.push(...node.documents);

      for (const child of Object.values(node.children)) {
        nodes.add(child);
      }
    }

    return documents;
  }
}
