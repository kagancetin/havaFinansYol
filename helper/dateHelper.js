export const getDayHour = () => {
    const time = new Date();
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const pad = (num) => num.toString().padStart(2, '0');

    return {
        year: time.getFullYear(),
        month: months[time.getMonth()],
        day: time.getDate(),
        dayName: days[time.getDay()],
        hour: pad(time.getHours()),
        minutes: pad(time.getMinutes())
    };
};