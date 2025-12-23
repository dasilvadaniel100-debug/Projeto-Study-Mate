import bcrypt from 'bcryptjs';
import db from './db';

export async function seedDatabase() {
  try {
    // Check if demo user already exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('iris.student@email.com');

    if (existingUser) {
      console.log('✅ Demo data already seeded');
      return;
    }

    console.log('🌱 Seeding database...');

    // Create demo user
    const passwordHash = await bcrypt.hash('demo123', 10);
    const userResult = db.prepare(`
      INSERT INTO users (email, password_hash, name, display_name, avatar_initials, avatar_gradient, school_year, course_track, target_average)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'iris.student@email.com',
      passwordHash,
      'Iris M.',
      'Iris',
      'IM',
      'from-pink-500 to-rose-500',
      12,
      'ciencias',
      18.0
    );

    const userId = userResult.lastInsertRowid;

    // Create subjects
    const subjects = [
      { name: 'Matemática A', emoji: '📐', gradient: 'from-blue-600 to-indigo-900', average: 16.2, progress: 75, next: 'Complexos' },
      { name: 'Física e Química', emoji: '⚛️', gradient: 'from-purple-600 to-fuchsia-900', average: 15.4, progress: 60, next: 'Mecânica' },
      { name: 'Biologia', emoji: '🧬', gradient: 'from-emerald-600 to-teal-900', average: 14.8, progress: 45, next: 'Genética' },
      { name: 'Português', emoji: '📚', gradient: 'from-orange-600 to-red-900', average: 15.0, progress: 80, next: 'Os Maias' },
      { name: 'Inglês', emoji: '🇬🇧', gradient: 'from-sky-600 to-blue-900', average: 18.5, progress: 90, next: 'Grammar' },
    ];

    const subjectIds: number[] = [];
    for (const subject of subjects) {
      const result = db.prepare(`
        INSERT INTO subjects (user_id, name, emoji_icon, color_gradient, current_average, progress_percentage, next_topic)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(userId, subject.name, subject.emoji, subject.gradient, subject.average, subject.progress, subject.next);
      subjectIds.push(result.lastInsertRowid as number);
    }

    // Create study plan tasks
    const today = new Date().toISOString().split('T')[0];
    const tasks = [
      { text: 'Resolver 10 ex. Complexos', subjectIdx: 0, time: '10:00', done: false },
      { text: 'Ler Cap. 4 Biologia', subjectIdx: 2, time: '11:30', done: true },
      { text: 'Resumo Física (Mecânica)', subjectIdx: 1, time: '14:00', done: false },
      { text: 'Verbo To Be', subjectIdx: 4, time: '16:00', done: false },
    ];

    for (const task of tasks) {
      db.prepare(`
        INSERT INTO study_plan_tasks (user_id, subject_id, task_text, scheduled_date, scheduled_time, completed)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(userId, subjectIds[task.subjectIdx], task.text, today, task.time, task.done ? 1 : 0);
    }

    // Create exam history
    const exams = [
      { title: 'Matemática A - 2023 1ª Fase', subjectIdx: 0, type: 'nacional', year: 2023, phase: '1fase', score: 15.4, status: 'completed' },
      { title: 'FQ A - Teste Intermédio', subjectIdx: 1, type: 'intermedio', year: 2024, phase: null, score: 14.2, status: 'completed' },
      { title: 'Biologia - Exame Modelo', subjectIdx: 2, type: 'modelo', year: 2024, phase: null, score: null, status: 'paused' },
    ];

    for (const exam of exams) {
      db.prepare(`
        INSERT INTO exams (user_id, subject_id, title, exam_type, year, phase, user_score, status, duration_minutes, total_score)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 150, 20)
      `).run(userId, subjectIds[exam.subjectIdx], exam.title, exam.type, exam.year, exam.phase, exam.score, exam.status);
    }

    // Create user stats
    db.prepare(`
      INSERT INTO user_stats (user_id, current_level, current_xp, total_study_hours, total_exercises, current_streak_days, longest_streak_days)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userId, 12, 2450, 142, 1240, 12, 18);

    // Create gamification badges
    const badges = [
      { name: 'Primeiros Passos', icon: 'Zap', color: 'yellow', type: 'complete_first_session', value: 1 },
      { name: '7 Dias Streak', icon: 'Flame', color: 'orange', type: 'streak', value: 7 },
      { name: 'Matemático', icon: 'Brain', color: 'blue', type: 'exercises_math', value: 50 },
      { name: 'Coruja Noturna', icon: 'Moon', color: 'indigo', type: 'study_night', value: 10 },
      { name: '100% Acerto', icon: 'Target', color: 'green', type: 'perfect_score', value: 1 },
    ];

    const badgeIds: number[] = [];
    for (const badge of badges) {
      const result = db.prepare(`
        INSERT INTO gamification_badges (name, icon, color, requirement_type, requirement_value)
        VALUES (?, ?, ?, ?, ?)
      `).run(badge.name, badge.icon, badge.color, badge.type, badge.value);
      badgeIds.push(result.lastInsertRowid as number);
    }

    // Unlock first 3 badges for demo user
    for (let i = 0; i < 3; i++) {
      db.prepare(`
        INSERT INTO user_badges (user_id, badge_id)
        VALUES (?, ?)
      `).run(userId, badgeIds[i]);
    }

    // Create some chat messages
    const chatMessages = [
      { role: 'assistant', content: 'Olá Iris! 👋 Analisei o teu último teste de Probabilidades.\n\nReparei que tiveste algumas dificuldades no **Teorema de Bayes**. Queres que te explique o conceito com um exemplo prático ou preferes tentar resolver um exercício guiado?', subjectId: subjectIds[0] },
      { role: 'user', content: 'Prefiro um exercício guiado, por favor. Algo relacionado com bolas coloridas em sacos, costumam sair no exame.', subjectId: subjectIds[0] },
    ];

    for (const msg of chatMessages) {
      db.prepare(`
        INSERT INTO chat_messages (user_id, role, content, subject_id)
        VALUES (?, ?, ?, ?)
      `).run(userId, msg.role, msg.content, msg.subjectId);
    }

    console.log('✅ Database seeded successfully with demo data');
    console.log('📧 Demo login: iris.student@email.com');
    console.log('🔑 Demo password: demo123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
