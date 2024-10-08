import { useEffect, useState } from 'react';
import { diffWords } from 'diff';
import { Button } from "@/components/ui/button";

const DiffViewer = ({ oldContent, newContent, onRestore }) => {
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    const diffResult = diffWords(oldContent, newContent);
    setDiff(diffResult);
  }, [oldContent, newContent]);

  return (
    <div className="w-full lg:w-1/2 p-4 bg-gray-50 overflow-y-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Previous Version</h3>
        <Button onClick={() => onRestore(oldContent)} variant="outline" size="sm">
          Restore
        </Button>
      </div>
      <div className="flex-1 overflow-hidden">
        <pre className="text-sm h-full overflow-auto whitespace-pre-wrap break-words">
          {diff.map((part, index) => (
            <span
              key={index}
              className={
                part.added
                  ? 'bg-green-200'
                  : part.removed
                  ? 'bg-red-200'
                  : ''
              }
            >
              {part.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default DiffViewer;
