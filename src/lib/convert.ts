export function convertTimeRange(timeRange: string): string {
    const timeParts = timeRange.split(" - ");
    
    // Helper function to convert AM/PM time to 24-hour format
    function convertTo24Hour(time: string): string {
        let [timeString, modifier] = time.split(/(AM|PM)/);
        let [hours, minutes] = timeString.split(':').map(Number);
        
        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    const startTime = convertTo24Hour(timeParts[0]);
    const endTime = convertTo24Hour(timeParts[1]);
    
    return `${startTime}-${endTime}`;
}