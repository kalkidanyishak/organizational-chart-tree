const tree = {
  root: {
    id: "head",
    parentId: null,
    name: "CEO",
    detail: "good",
    isCollapsed: false,
    children: [
      {
        id: "deputy",
        parentId: "head",
        name: "Deputy Director",
        detail: "...",
        isCollapsed: false,
        children: [
          {
            id: "director",
            parentId: "deputy",
            name: "Director of HR",
            detail: "...",
            isCollapsed: false,
            children: [],
          },
        ],
      },
    ],
  },
};

function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }

  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}

const treeCopy = deepCopy(tree);

function getNodeHelper(tree, id) {
  if (!tree || typeof tree !== "object") return null;

  if (tree.id === id) return tree;

  if (Array.isArray(tree.children)) {
    for (const child of tree.children) {
      const found = getNodeHelper(child, id);
      if (found) return found;
    }
  }

  return null;
}

function createChild(id, parentId, name, detail) {
  return {
    id,
    parentId,
    name,
    detail,
    isCollapsed: false,
    children: [],
  };
}

function addChildUnit(tree, id, child) {
  let node = getNodeHelper(tree.root, id);
  if (!node) return;
  if (!node.children) node.children = [];
  //Bam Bam
  node.children.push(child);
}



function removeSelfUnit(tree, id) {
  let node = getNodeHelper(tree.root, id);
  let parent = getNodeHelper(tree.root, node.parentId);
  if (!parent) return;
  //Bam Bam
  parent.children = parent.children.filter((child) => child.id !== id);
}
function toggleSelfUnit(tree, id) {
  let node = getNodeHelper(tree.root, id);
  if (!node) return;
  //Bam Bam
  node.isCollapsed = !node.isCollapsed;
}

function editSelfDetailUnit(tree, id, newDetails) {
  let node = getNodeHelper(tree.root, id);
  if (!node) return;
  //Bam Bam
  node.detail = newDetails;
}

function editSelfTitleUnit(tree, id, newTitle) {
  let node = getNodeHelper(tree.root, id);
  if (!node) return;
  //Bam Bam
  node.title = newTitle;
}



/*
make it collapsible
create a traverser
test it
*/