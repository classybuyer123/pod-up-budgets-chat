
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface CVUploadProps {
  onAnalysisComplete: (skills: string[], experience: string[]) => void;
}

const CVUpload: React.FC<CVUploadProps> = ({ onAnalysisComplete }) => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'analyzing' | 'complete' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadState('uploading');

    // Simulate file upload
    setTimeout(() => {
      setUploadState('analyzing');
      
      // Simulate AI analysis
      setTimeout(() => {
        // Mock analysis results
        const mockSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Data Analysis'];
        const mockExperience = ['Frontend Development', 'Backend Development', 'Full Stack', 'Data Science'];
        
        setUploadState('complete');
        onAnalysisComplete(mockSkills, mockExperience);
      }, 2000);
    }, 1000);
  }, [onAnalysisComplete]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
      setFileName(file.name);
      setUploadState('uploading');
      
      setTimeout(() => {
        setUploadState('analyzing');
        setTimeout(() => {
          const mockSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Data Analysis'];
          const mockExperience = ['Frontend Development', 'Backend Development', 'Full Stack', 'Data Science'];
          setUploadState('complete');
          onAnalysisComplete(mockSkills, mockExperience);
        }, 2000);
      }, 1000);
    }
  }, [onAnalysisComplete]);

  return (
    <Card className="p-6 bg-slate-800 border-slate-700 professional-shadow">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="professional-gradient p-2 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-inter font-bold text-slate-100">AI-Powered CV Analysis</h3>
            <p className="text-sm text-slate-400 font-inter">Get personalized gig recommendations</p>
          </div>
        </div>

        {uploadState === 'idle' && (
          <div
            className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-slate-500 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('cv-upload')?.click()}
          >
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-300 font-inter font-medium mb-2">Upload your CV</p>
            <p className="text-sm text-slate-400 font-inter">Drag & drop or click to browse</p>
            <p className="text-xs text-slate-500 font-inter mt-2">PDF files only</p>
            <input
              id="cv-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {uploadState === 'uploading' && (
          <div className="text-center py-8">
            <div className="animate-spin professional-gradient w-8 h-8 rounded-full mx-auto mb-4"></div>
            <p className="text-slate-300 font-inter font-medium">Uploading {fileName}...</p>
          </div>
        )}

        {uploadState === 'analyzing' && (
          <div className="text-center py-8">
            <div className="animate-pulse professional-gradient w-8 h-8 rounded-full mx-auto mb-4"></div>
            <p className="text-slate-300 font-inter font-medium">AI is analyzing your CV...</p>
            <p className="text-sm text-slate-400 font-inter mt-1">Extracting skills and experience</p>
          </div>
        )}

        {uploadState === 'complete' && (
          <div className="text-center py-6">
            <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
            <p className="text-slate-300 font-inter font-medium">Analysis complete!</p>
            <p className="text-sm text-slate-400 font-inter mt-1">Tailored recommendations are now available</p>
          </div>
        )}

        {uploadState === 'error' && (
          <div className="text-center py-6">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
            <p className="text-slate-300 font-inter font-medium">Upload failed</p>
            <Button 
              onClick={() => setUploadState('idle')}
              variant="outline"
              className="mt-3 border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CVUpload;
