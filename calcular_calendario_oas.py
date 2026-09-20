import datetime

# Year 2026 Calendar from March 1st to August 31st
start_date = datetime.date(2026, 3, 2) # First Monday of March
end_date = datetime.date(2026, 8, 31)   # End of August

# Holidays in Chile between March 2 and August 31, 2026 (weekdays only)
holidays = [
    datetime.date(2026, 4, 3),   # Viernes Santo
    datetime.date(2026, 5, 1),   # Día del Trabajo (Viernes)
    datetime.date(2026, 5, 21),  # Glorias Navales (Jueves)
    datetime.date(2026, 6, 21),  # Pueblos Indígenas (Domingo/Lunes)
    datetime.date(2026, 6, 29),  # San Pedro y San Pablo (Lunes)
    datetime.date(2026, 7, 16),  # Virgen del Carmen (Jueves)
    # Vacaciones de invierno: 2 weeks in July (approx July 6 to July 17 = 10 weekdays)
]
winter_break = [
    datetime.date(2026, 7, 6) + datetime.timedelta(days=i) for i in range(10) # 2 weeks (Mon-Fri)
]

all_off_days = set(holidays + winter_break)

weekdays_total = 0
cur = start_date
weeks_count = 0
monday_count = 0

weekly_schedule = {"Lunes": 0, "Martes": 0, "Miercoles": 0, "Jueves": 0, "Viernes": 0}

while cur <= end_date:
    if cur.weekday() < 5: # Monday to Friday
        if cur not in all_off_days:
            weekdays_total += 1
            day_name = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"][cur.weekday()]
            weekly_schedule[day_name] += 1
    cur += datetime.timedelta(days=1)

print(f"Total días hábiles efectivos (Marzo a Agosto): {weekdays_total}")
print(f"Desglose por día de la semana:")
for k, v in weekly_schedule.items():
    print(f"  {k}: {v} sesiones posibles")

total_weeks_net = (end_date - start_date).days / 7.0 - 2 # minus 2 weeks winter break
print(f"Semanas lectivas efectivas: {total_weeks_net:.1f} semanas")

num_oas = 9
print(f"\n--- OAs: {num_oas} (01, 03, 04, 06, 08, 11, 14, 16, 18) ---")
for freq in [2, 3, 4, 5]:
    total_classes = int(total_weeks_net * freq)
    classes_per_oa = total_classes / num_oas
    print(f"Frecuencia {freq} clases/semana de Matemática -> Total: {total_classes} clases -> {classes_per_oa:.1f} lecciones por OA")
