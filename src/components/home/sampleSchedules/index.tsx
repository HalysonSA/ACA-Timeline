export default function SampleSchedules() {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const hours = ['07:30', '08:10', '08:50', '09:30', '10:10', '10:50', '11:30'];

  const dataSchedule = [
    {
      Segunda: {
        '07:30': 'Marcos',
        '08:10': 'Jose',
        '08:50': null,
        '09:30': null,
        '10:10': null,
        '10:50': null,
        '11:30': 'Maria',
      },
    },
    {
      Terça: {
        '07:30': 'Maycon',
        '08:10': 'Joao',
        '08:50': null,
        '09:30': null,
        '10:10': null,
        '10:50': null,
        '11:30': 'zé',
      },
    },
    {
      Quarta: {
        '07:30': 'Marcos',
        '08:10': 'Jose',
        '08:50': null,
        '09:30': 'Joas',
        '10:10': null,
        '10:50': null,
        '11:30': 'Davi',
      },
    },
    {
      Quinta: {
        '07:30': 'Marcos',
        '08:10': 'Jose',
        '08:50': null,
        '09:30': null,
        '10:10': null,
        '10:50': null,
        '11:30': 'Maria',
      },
    },
    {
      Sexta: {
        '07:30': 'Marcos',
        '08:10': 'Jose',
        '08:50': null,
        '09:30': null,
        '10:10': null,
        '10:50': null,
        '11:30': 'Maria',
      },
    },
  ];
  console.log(dataSchedule);

  return (
    <div className="overflow-auto max-w-table  w-full bg-cyan-800 select-none">
      <table>
        <caption className="text-white text-xl">
          Horarios de atendimento
        </caption>
        <tr>
          <th className="th-theme"></th>
          {days.map((day) => (
            <>
              <th key={day} className="th-theme ">
                {day}
              </th>
            </>
          ))}
        </tr>
        {hours.map((hour) => {
          return (
            <tr key={hour}>
              <th className="th-theme">{hour}</th>
              {days.map((day) => {
                return (
                  <>
                    {dataSchedule.map((schedule: any) => {
                      if (schedule[day]) {
                        if (schedule[day][hour] === null) {
                          return (
                            <td
                              className="td-open-theme"
                              key={schedule[day][hour]}
                            ></td>
                          );
                        } else {
                          return (
                            <td
                              className="td-close-theme"
                              key={schedule[day][hour]}
                            ></td>
                          );
                        }
                      }
                    })}
                  </>
                );
              })}
            </tr>
          );
        })}
        <tfoot>
          <tr className="h-14 bg-cyan-800  subtitle">
            <td></td>
            <td className="">
              <span className="bg-green-500 rounded-sm w-4 h-4 inline-block ml-14"></span>
            </td>
            <td>
              <span>Horario disponivel</span>
            </td>

            <td>
              <span className="bg-red-300 rounded-sm w-4 h-4 inline-block ml-14 "></span>
            </td>
            <td>
              <span>Horario indisponivel</span>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
