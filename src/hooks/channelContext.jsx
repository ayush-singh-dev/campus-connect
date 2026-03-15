import { createContext, useContext, useState } from "react";

const ChannelContext = createContext(null);

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  console.log("ChannelProvider rendered with channels:", channels);
  const [loading, setLoading] = useState(false);
  return (
    <ChannelContext.Provider
      value={{ channels, setChannels, loading, setLoading }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
export const useChannelContext = () => {
  const context = useContext(ChannelContext);

  if (!context) {
    throw new Error("useChannelContext must be used inside ChannelProvider");
  }

  return context;
};
