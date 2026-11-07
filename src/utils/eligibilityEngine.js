/**
 * Rule-based AI Eligibility Matching Engine for Indian Scholarships
 * Evaluates student profile attributes against institutional eligibility criteria.
 */

export function calculateEligibilityMatch(student, scholarship) {
  if (!student || !scholarship) {
    return {
      score: 50,
      grade: 'Moderate',
      isEligible: true,
      matchedReasons: ['Standard profile evaluation applied.'],
      unmatchedReasons: [],
      missingInfo: [],
      hardBlock: false,
      summary: 'Basic criteria partially matched.'
    };
  }

  let totalScore = 0;
  let maxPossible = 100;
  const matchedReasons = [];
  const unmatchedReasons = [];
  const missingInfo = [];
  let hardBlock = false;

  // 1. GENDER CRITERIA (Weight: 15 pts)
  if (scholarship.targetGender && scholarship.targetGender !== 'All') {
    if (student.gender && student.gender.toLowerCase() === scholarship.targetGender.toLowerCase()) {
      totalScore += 15;
      matchedReasons.push(`Gender requirement met: Reserved for ${scholarship.targetGender} candidates.`);
    } else if (student.gender) {
      hardBlock = true;
      unmatchedReasons.push(`Gender mismatch: Program is exclusively reserved for ${scholarship.targetGender} candidates.`);
    } else {
      missingInfo.push('Specify your gender in Profile to verify this exclusive quota.');
    }
  } else {
    totalScore += 15;
    matchedReasons.push('Open to all genders without restriction.');
  }

  // 2. SOCIAL CATEGORY / CASTE (Weight: 20 pts)
  const targetCats = scholarship.targetCategory || ['All'];
  if (targetCats.includes('All')) {
    totalScore += 20;
    matchedReasons.push(`Category open to all students (You are: ${student.category || 'General'}).`);
  } else if (student.category && targetCats.includes(student.category)) {
    totalScore += 20;
    matchedReasons.push(`Social category matched: You belong to ${student.category}, which is explicitly eligible.`);
  } else if (student.category) {
    hardBlock = true;
    unmatchedReasons.push(`Category requirement not met: Scheme is restricted to [${targetCats.join(', ')}], but your profile is registered as ${student.category}.`);
  } else {
    missingInfo.push('Select your reservation category (General/OBC/SC/ST/EWS) in Profile.');
  }

  // 3. FAMILY ANNUAL INCOME (Weight: 25 pts)
  if (scholarship.maxIncome) {
    const studentIncome = Number(student.familyIncome || 0);
    if (!student.familyIncome && student.familyIncome !== 0) {
      missingInfo.push('Provide your exact annual family income to verify economic threshold.');
      totalScore += 10;
    } else if (studentIncome <= scholarship.maxIncome) {
      totalScore += 25;
      const formattedMax = (scholarship.maxIncome / 100000).toFixed(1) + ' Lakhs';
      const formattedStud = (studentIncome / 100000).toFixed(1) + ' Lakhs';
      matchedReasons.push(`Income criteria satisfied: Family income of ₹${formattedStud} is within the ₹${formattedMax} ceiling.`);
    } else {
      hardBlock = true;
      const formattedMax = (scholarship.maxIncome / 100000).toFixed(1) + ' Lakhs';
      const formattedStud = (studentIncome / 100000).toFixed(1) + ' Lakhs';
      unmatchedReasons.push(`Income exceeds limit: Family income (₹${formattedStud}) is higher than maximum allowed (₹${formattedMax}).`);
    }
  } else {
    totalScore += 25;
    matchedReasons.push('No stringent family income barrier stated.');
  }

  // 4. ACADEMIC MARKS / PERCENTAGE (Weight: 25 pts)
  const minPercentage = scholarship.minPercentage || 50;
  const studentPercentage = Number(student.percentage || student.class12Percentage || 0);

  if (!studentPercentage) {
    missingInfo.push('Enter your recent academic percentage or CGPA in Profile.');
    totalScore += 10;
  } else if (studentPercentage >= minPercentage) {
    totalScore += 25;
    matchedReasons.push(`Academic merit satisfied: Your score of ${studentPercentage}% exceeds required minimum of ${minPercentage}%.`);
  } else if (studentPercentage >= minPercentage - 5) {
    totalScore += 12;
    unmatchedReasons.push(`Borderline academic score: Required minimum is ${minPercentage}%, while your score is ${studentPercentage}%.`);
  } else {
    unmatchedReasons.push(`Academic criterion unmet: Required minimum is ${minPercentage}%, your score is ${studentPercentage}%.`);
  }

  // 5. EDUCATION LEVEL & COURSE (Weight: 10 pts)
  const allowedLevels = scholarship.educationLevel || [];
  const studentCourse = (student.educationLevel || student.course || '').toLowerCase();

  const levelMatched = allowedLevels.some(lvl => {
    const l = lvl.toLowerCase();
    return l === 'all' || l === 'undergraduate' || studentCourse.includes(l) || l.includes('b.tech') && studentCourse.includes('b.tech');
  });

  if (allowedLevels.length === 0 || levelMatched) {
    totalScore += 10;
    matchedReasons.push(`Course level eligible: Matches your current program (${student.educationLevel || 'Degree'}).`);
  } else {
    unmatchedReasons.push(`Course alignment mismatch: Scholarship is designated for [${allowedLevels.join(', ')}].`);
  }

  // 6. DOMICILE & STATE RESIDENCY (Weight: 5 pts)
  const allowedStates = scholarship.states || ['All India'];
  if (allowedStates.includes('All India')) {
    totalScore += 5;
    matchedReasons.push('Pan-India eligibility: Students from all states and UTs are welcome.');
  } else if (student.domicileState && allowedStates.includes(student.domicileState)) {
    totalScore += 5;
    matchedReasons.push(`State domicile verified: You are resident of ${student.domicileState}.`);
  } else if (student.domicileState) {
    hardBlock = true;
    unmatchedReasons.push(`State restriction: Requires domicile of [${allowedStates.join(', ')}], but your domicile is ${student.domicileState}.`);
  } else {
    missingInfo.push('Add your home state / domicile in Profile.');
  }

  // 7. SPECIAL QUOTAS (Disability etc.)
  if (scholarship.category === 'Disability Support') {
    if (!student.isDifferentlyAbled) {
      hardBlock = true;
      unmatchedReasons.push('Strict criteria: Exclusively for students with certified benchmark disability (≥ 40%).');
    } else {
      matchedReasons.push('Disability support criteria verified.');
    }
  }

  // Apply Hard Block penalties to realistic score
  let finalScore = Math.min(100, Math.max(10, totalScore));
  if (hardBlock) {
    finalScore = Math.min(38, Math.round(finalScore * 0.4));
  }

  // Determine Grade
  let grade = 'Moderate';
  if (finalScore >= 85) grade = 'Excellent Match';
  else if (finalScore >= 70) grade = 'Strong Match';
  else if (finalScore >= 50) grade = 'Moderate Match';
  else grade = 'Low Match / Ineligible';

  let summary = '';
  if (finalScore >= 85) {
    summary = 'Outstanding fit! You satisfy all primary criteria including merit, income, and category.';
  } else if (finalScore >= 70) {
    summary = 'High probability of selection! Most core benchmarks are satisfied.';
  } else if (finalScore >= 50) {
    summary = 'Partially eligible. Check individual criteria or upload pending documentation.';
  } else {
    summary = 'Currently does not meet minimum qualifying benchmarks for this scheme.';
  }

  return {
    score: finalScore,
    grade,
    isEligible: finalScore >= 60 && !hardBlock,
    hardBlock,
    matchedReasons,
    unmatchedReasons,
    missingInfo,
    summary
  };
}
