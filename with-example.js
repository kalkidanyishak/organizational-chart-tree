type Label = {
    name: string;
    detail: string;
  };
  
  type TreeNode = {
    id: string;
    labels: Label[];
    children: TreeNode[];
  };
  
  export const myTree: TreeNode = {
    id: 'head',
    labels: [{ name: 'CEO', detail: 'good' }],
    children: [
      {
        id: 'B1',
        labels: [
          { name: 'Deputy Director', detail: '...' },
          { name: 'Deputy Director', detail: '...' },
        ],
        children: [
          {
            id: 'C1',
            labels: [
              { name: 'Director of HR', detail: '...' },
              { name: 'Director of Finance', detail: '...' },
              { name: 'Director of Research', detail: '...' },
              { name: 'Director of Service', detail: '...' },
            ],
            children: [
              {
                id: 'D1',
                labels: [{ name: 'Senior Officer', detail: '...' }],
                children: [
                  {
                    id: 'E1',
                    labels: [{ name: 'Designer', detail: '...' }],
                    children: [],
                  },
                ],
              },
              {
                id: 'D2',
                labels: [{ name: 'Senior Officer', detail: '...' }],
                children: [],
              },
              {
                id: 'D3',
                labels: [{ name: 'Deputy Office', detail: '...' }],
                children: [
                  {
                    id: 'EB',
                    labels: [{ name: 'Engineering', detail: '...' }],
                    children: [],
                  },
                ],
              },
              {
                id: 'D4',
                labels: [{ name: 'Senior Officer', detail: '...' }],
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
  
  // Function to get a node by its ID
  const getById = (id: string): TreeNode | null => {
    const traverseTree = (node: TreeNode): TreeNode | null => {
      if (node.id === id) {
        return node; // Return the matching node
      }
      for (const child of node.children) {
        const result = traverseTree(child);
        if (result) {
          return result; // Return the found node from the child
        }
      }
      return null; // Return null if no match is found
    };
    
    return traverseTree(myTree); // Start traversal from the root
  };
  
  // Function to set (update) a node by its ID
  const setById = (id: string, newLabels: Label[]): boolean => {
    const traverseTree = (node: TreeNode): boolean => {
      if (node.id === id) {
        node.labels = newLabels; // Update the labels
        return true; // Return true indicating success
      }
      for (const child of node.children) {
        if (traverseTree(child)) {
          return true; // Return true if the node was found and updated
        }
      }
      return false; // Return false if no match is found
    };
    
    return traverseTree(myTree); // Start traversal from the root
  };
  
  // Function to delete a node by its ID
  const deleteById = (id: string): boolean => {
    const traverseTree = (node: TreeNode): boolean => {
      const index = node.children.findIndex(child => child.id === id);
      if (index !== -1) {
        node.children.splice(index, 1); // Remove the child from the children array
        return true; // Return true indicating success
      }
      for (const child of node.children) {
        if (traverseTree(child)) {
          return true; // Return true if the node was found and deleted
        }
      }
      return false; // Return false if no match is found
    };
    
    return traverseTree(myTree); // Start traversal from the root
  };
  
  // Example usage
  let obj = getById('D3');
  console.log('Get by ID D3:', obj);
  
  let updated = setById('D3', [{ name: 'Updated Deputy Office', detail: 'Updated detail' }]);
  console.log('Update result for D3:', updated);
  console.log('Get updated D3:', getById('D3'));
  
  let deleted = deleteById('D3');
  console.log('Delete result for D3:', deleted);
  console.log('Get deleted D3:', getById('D3'));
  

  const addChildById = (parentId: string, newChild: TreeNode): boolean => {
  const traverseTree = (node: TreeNode): boolean => {
    if (node.id === parentId) {
      node.children.push(newChild); // Add the new child to the children array
      return true; // Return true indicating success
    }
    for (const child of node.children) {
      if (traverseTree(child)) {
        return true; // Return true if the parent node was found and child added
      }
    }
    return false; // Return false if no match is found
  };
  
  return traverseTree(myTree); // Start traversal from the root
};

// Example usage
const newChildNode: TreeNode = {
  id: 'D5',
  labels: [{ name: 'New Senior Officer', detail: '...' }],
  children: [],
};

let added = addChildById('D3', newChildNode); // Adding a new child to the node with ID 'D3'
console.log('Add child to D3 result:', added);
console.log('Get updated D3:', getById('D3'));
