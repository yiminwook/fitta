import { useOwner } from '@/hooks/useAPI';
import ownerHome from '@/components/owner/home/Home.module.scss';

const OwnerSummarySection = () => {
  const { ownerMyAllData, ownerMyData } = useOwner();

  if (!(ownerMyAllData && ownerMyData)) {
    return null;
  }

  const { allgymCount, memberAgeRate, memberRate, memberTodayRate } = ownerMyAllData;
  const { gymCount, memberCount, teamCount } = allgymCount;

  return (
    <section className={ownerHome['ownerSummarySection']}>
      <table>
        <thead>
          <tr>
            <th>전체 체육관갯수</th>
            <th>전체 회원수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{gymCount}</td>
            <td>{memberCount}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default OwnerSummarySection;
