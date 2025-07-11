'use client';

import React, { useRef, useEffect } from 'react';
// @ts-ignore
import ApexTree from 'apextree';

/**
 * A React wrapper for the imperative ApexTree library.
 * It manages the lifecycle and updates of the tree.
 */
function ApexTreeWrapper({ data, options }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a more specific type if you know the ApexTree instance methods
  const treeInstanceRef = useRef<any>(null);

  // --- Main Effect for Initialization and Updates ---
  useEffect(() => {
    // Ensure the container is mounted
    if (!containerRef.current) {
      return;
    }

    // Create the tree instance. This code runs on mount or when `options` change.
    treeInstanceRef.current = new ApexTree(containerRef.current, options);
    
    // Always render with the latest data when the tree is created/re-created.
    if (data) {
      treeInstanceRef.current.render(data);
    }

    // --- Cleanup Function ---
    // This is the crucial part. React runs this when the component unmounts
    // or BEFORE this effect runs again (e.g., if `options` changes).
    return () => {
      // Check if the library has a destroy method (most do)
      if (treeInstanceRef.current && typeof treeInstanceRef.current.destroy === 'function') {
        treeInstanceRef.current.destroy();
      }
      
      // As a fallback, clear the container's HTML to prevent orphaned elements
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      
      treeInstanceRef.current = null;
    };
    // This effect re-runs ONLY if `options` changes, destroying the old tree and creating a new one.
  }, [options]);


  // --- Effect for Data-Only Updates ---
  // This separate effect handles data changes efficiently without re-creating the whole tree.
  useEffect(() => {
    // If a tree instance exists, just update its data.
    if (treeInstanceRef.current && data) {
      treeInstanceRef.current.render(data);
    }
    // This effect runs ONLY when `data` changes.
  }, [data]);

  return <div ref={containerRef} className='w-[100%]' />;
}

export default ApexTreeWrapper;

