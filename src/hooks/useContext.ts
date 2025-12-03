import { AppContext } from "@/provider/AppProvider";
import { useContext } from "react";

const useGlobalContext = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a AppProvider');
  }
  return context;
}

export default useGlobalContext;