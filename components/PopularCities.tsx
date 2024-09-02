import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Thermometer, Wind, X, Plus } from 'lucide-react';
import AddCityForm from './AddCityForm';
import { toast } from 'sonner';

interface CityData {
  name: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

interface Props {
  citiesData: CityData[];
  onCityClick: (city: string) => void;
  onCityDelete: (city: string) => void;
  onAddCity: (city: string) => Promise<void>;
}

const PopularCities: React.FC<Props> = ({ citiesData, onCityClick, onCityDelete, onAddCity }) => {
  const [isAddingCity, setIsAddingCity] = useState(false);

  const handleAddCity = async (city: string) => {
    try {
      await onAddCity(city);
      // toast.success(`City "${city}" added successfully!`);
      setIsAddingCity(false);
    } catch (error) {
      // toast.error('Failed to add city. Please try again.');
    }
  };

  const handleDeleteCity = (city: string) => {
    if (citiesData.some(cityData => cityData.name === city)) {
      try {
        onCityDelete(city);
        toast.success(`City "${city}" removed successfully!`);
      } catch (error) {
        toast.error('Failed to remove city. Please try again.');
      }
    } else {
      toast.error(`City "${city}" not found in the list.`);
    }
  };

  return (
    <div className='lg:w-1/3 w-full'>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Popular Cities</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsAddingCity(!isAddingCity)}>
            {isAddingCity ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span className="sr-only">{isAddingCity ? "Cancel" : "Add city"}</span>
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingCity && (
            <AddCityForm onAddCity={handleAddCity} onCancel={() => setIsAddingCity(false)} />
          )}
          <div className="space-y-4">
            {citiesData.map((cityData, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-primary-foreground rounded-lg hover:bg-primary/10 transition-colors"
              >
                <div
                  className="flex items-center cursor-pointer flex-grow"
                  onClick={() => onCityClick(cityData.name)}
                >
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium">{cityData.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 mr-1 text-primary" />
                    <span>{cityData.temperature}°C</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="w-4 h-4 mr-1 text-primary" />
                    <span>{cityData.windSpeed} km/h</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCity(cityData.name)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Delete city</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularCities;