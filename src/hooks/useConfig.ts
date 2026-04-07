import { useState, useEffect } from 'react';

export interface ConfigData {
  business: {
    mobile: string;
    whatsapp: string;
    facebook: string;
    instagram: string;
    ownerName: string;
    mapUrl: string;
    locations: Array<{
      city: string;
      address: string;
      phone: string;
      owner: string;
      mapUrl: string;
    }>;
  };
  links: {
    talkToExperts: string;
    freeQuote: string;
  };
}

const DEFAULT_CONFIG: ConfigData = {
  business: {
    mobile: "+91 99789 70039",
    whatsapp: "https://wa.me/919978970550",
    facebook: "#",
    instagram: "https://www.instagram.com/nilkanth_enter_prise",
    ownerName: "Harshil Dave",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119106.31484218764!2d73.49122396347185!3d21.09172283995679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fbc95763cc7%3A0xe545c850239b9789!2sSongadh%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1711438000000!5m2!1sen!2sin",
    locations: []
  },
  links: {
    talkToExperts: "https://wa.me/919978970550",
    freeQuote: "https://wa.me/919978970550"
  }
};

export const useConfig = () => {
  const [config, setConfig] = useState<ConfigData>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = await fetch('/data/config.json');
        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        console.error('Error fetching config:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
};
