
import { ReactNode } from 'react';
import { PhotoProvider } from 'react-photo-view';

interface PhotoProviderWrapperProps {
  children: ReactNode;
}

const PhotoProviderWrapper = ({ children }: PhotoProviderWrapperProps) => {
  return (
    <PhotoProvider
      speed={() => 800}
      easing={(type) => 
        type === 2 
          ? "cubic-bezier(0.1, 0.1, 0.25, 1)" 
          : "cubic-bezier(0.1, 0.1, 0.25, 1)"
      }
      maskOpacity={0.7}
      photoClosable={true}
      overlayRender={() => (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
      )}
    >
      {children}
    </PhotoProvider>
  );
};

export default PhotoProviderWrapper;