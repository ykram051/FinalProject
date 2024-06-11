<template>
  <div class="container mt-5 user-records">
    <h1 class="text-center mb-4"><i class="fas fa-user"></i> Records for User: {{ userId }}</h1>
    <div v-if="loading" class="text-center">
      <p><i class="fas fa-spinner fa-spin"></i> Loading...</p>
    </div>
    <div v-else>
      <div v-if="records.length === 0" class="text-center">
        <p><i class="fas fa-exclamation-triangle"></i> No records found for this user.</p>
      </div>
      <div v-else>
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th><i class="fas fa-id-badge"></i> Quiz ID</th>
              <th><i class="fas fa-star"></i> Score</th>
              <th><i class="fas fa-calendar-alt"></i> Date Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td><i class="fas fa-file-alt"></i> {{ record.quizID }}</td>
              <td><i class="fas fa-trophy"></i> {{ record.score }}</td>
              <td><i class="fas fa-clock"></i> {{ record.dateTaken.toDate().toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase/Config';

export default {
  name: 'UserRecords',
  data() {
    return {
      userId: this.$route.params.id,
      records: [],
      loading: true
    };
  },
  async created() {
    await this.fetchUserRecords();
  },
  methods: {
    async fetchUserRecords() {
      try {
        const recordsSnapshot = await db.collection('results').where('userID', '==', this.userId).get();
        this.records = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching user records:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');

body {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 50px;
}

.user-records {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 2.5rem;
  font-family: 'Italiana', serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 i {
  margin-right: 10px;
  color: #007bff;
}

.table {
  margin-top: 20px;
}

th, td {
  padding: 15px;
  text-align: center;
}

th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

td {
  background-color: #f8f9fa;
  color: #333;
}

.table-hover tbody tr:hover {
  background-color: #d6e0f5;
}

.text-center i {
  margin-right: 10px;
}

.container {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 50px;
  border-radius: 15px;
}
</style>
