import { useOwner } from '@/hooks/useAPI';

const OwnerSummarySection = () => {
  const { ownerMyAllData, ownerMyData } = useOwner();

  if (!(ownerMyAllData && ownerMyData)) {
    return null;
  }

  const { allgymCount, memberAgeRate, memberRate, memberTodayRate } = ownerMyAllData;
  const { gymCount, memberCount, teamCount } = allgymCount;

  return (
    <section>
      <table>
        <thead>
          <td>
            <tr>전체 체육관갯수</tr>
          </td>
          <td>
            <tr>전체 회원수</tr>
          </td>
        </thead>
        <tbody>
          <td>
            <tr>{gymCount}</tr>
          </td>
          <td>
            <tr>{memberCount}</tr>
          </td>
        </tbody>
      </table>
    </section>
  );
};

export default OwnerSummarySection;
