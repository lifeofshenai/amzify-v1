import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Wand2, Loader2, RefreshCw } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
// import { LookaService } from '../../services/onboarding/lookaService';
// import { useOnboardingStore } from '../../stores/onboardingStore';
import toast from 'react-hot-toast';

export default function LogoUpload({ initialLogo, onLogoChange }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialLogo?.url || '');
  const [colors, setColors] = useState({
    primary: initialLogo?.colors.primary || '#ff006b',
    secondary: initialLogo?.colors.secondary || '#ff61a2'
  });
  const [generatedLogos, setGeneratedLogos] = useState([]);
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(-1);
  // const { vendorDetails } = useOnboardingStore();
  // const lookaService = new LookaService();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result;
        setPreviewUrl(url);
        setGeneratedLogos([]);
        setSelectedLogoIndex(-1);
        onLogoChange({
          url,
          colors
        });
        toast.success('Logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  }, [colors, onLogoChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    maxFiles: 1,
    multiple: false
  });

  const generateAILogo = async () => {
    // if (!vendorDetails?.companyName) {
    //   toast.error('Please enter your company name first');
    //   return;
    // }

    // setIsGenerating(true);
    // try {
    //   const result = await lookaService.generateLogo(vendorDetails?.companyName, colors);
    //   setGeneratedLogos(result.logos.map(logo => logo.url));
    //   setSelectedLogoIndex(0);
    //   setPreviewUrl(result.logos[0].url);
    //   onLogoChange({
    //     url: result.logos[0].url,
    //     colors
    //   });
    //   toast.success('AI logos generated successfully!');
    // } catch (error) {
    //   toast.error('Failed to generate AI logo');
    // } finally {
    //   setIsGenerating(false);
    // }
  };

  const handleColorChange = async (type, color) => {
    // const newColors = { ...colors, [type]: color };
    // setColors(newColors);

    // if (selectedLogoIndex >= 0) {
    //   try {
    //     const result = await lookaService.customizeLogo(generatedLogos[selectedLogoIndex], {
    //       colors: newColors
    //     });
    //     setPreviewUrl(result.url);
    //     onLogoChange({
    //       url: result.url,
    //       colors: newColors
    //     });
    //   } catch (error) {
    //     toast.error('Failed to update logo colors');
    //   }
    // } else if (previewUrl) {
    //   onLogoChange({
    //     url: previewUrl,
    //     colors: newColors
    //   });
    // }
  };

  const handleSelectLogo = (index) => {
    setSelectedLogoIndex(index);
    setPreviewUrl(generatedLogos[index]);
    onLogoChange({
      url: generatedLogos[index],
      colors
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Company Logo</h3>
        {previewUrl && (
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {showColorPicker ? 'Hide Colors' : 'Customize Colors'}
          </button>
        )}
      </div>

      {showColorPicker && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Primary Color</label>
            <HexColorPicker
              color={colors.primary}
              onChange={(color) => handleColorChange('primary', color)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">Secondary Color</label>
            <HexColorPicker
              color={colors.secondary}
              onChange={(color) => handleColorChange('secondary', color)}
            />
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div
          {...getRootProps()}
          className={`flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer relative
            ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'}`}
        >
          <input {...getInputProps()} />
          {previewUrl ? (
            <div className="relative w-full h-32 mb-2">
              <img
                src={previewUrl}
                alt="Company logo"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">Click or drag to replace</p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {isDragActive ? 'Drop your logo here' : 'Drag & drop your logo or click to select'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports PNG, JPG, JPEG, or SVG
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          // onClick={generateAILogo}
          // disabled={isGenerating}
          // className="flex-1 flex items-center justify-center px-4 py-2 border border-primary-600 rounded-lg text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
          className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 opacity-50 cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate with AI
            </>
          )}
        </button>
      </div>

      {generatedLogos.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">AI Generated Options</h4>
          <div className="grid grid-cols-3 gap-4">
            {generatedLogos.map((logo, index) => (
              <button
                key={index}
                onClick={() => handleSelectLogo(index)}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedLogoIndex === index
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200 hover:bg-primary-50'
                }`}
              >
                <img
                  src={logo}
                  alt={`AI Logo ${index + 1}`}
                  className="w-full h-24 object-contain"
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={generateAILogo}
            className="w-full flex items-center justify-center px-4 py-2 text-sm text-primary-600 hover:text-primary-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate More Options
          </button>
        </div>
      )}
    </div>
  );
}