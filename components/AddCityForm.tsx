import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  onAddCity: (city: string) => void;
  onCancel: () => void;
}

const AddCityForm: React.FC<Props> = ({ onAddCity, onCancel }) => {
  const [newCity, setNewCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity) {
      setIsLoading(true);
      try {
        await onAddCity(newCity);
        // toast.success(`City "${newCity}" added successfully!`);
        setNewCity('');
        onCancel();
      } catch (err) {
        // toast.error('Failed to add city. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter city name"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          className="flex-grow"
          disabled={isLoading}
        />
        <Button type="submit" disabled={!newCity || isLoading}>
          <Search className="h-4 w-4 mr-2" />
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default AddCityForm;