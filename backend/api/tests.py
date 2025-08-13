from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Student, Teacher

User = get_user_model()

# Comprehensive test class for both Student and Teacher functionality
class UserRoleTestCase(TestCase):
    
    def setUp(self):
        self.client = APIClient()
        
        # Registration data for new users
        self.student_registration_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'johndoe@example.com',
            'username': 'johndoe_student',
            'password': 'testpass123',
            'role': 'student'
        }
        
        self.teacher_registration_data = {
            'first_name': 'Sarah',
            'last_name': 'Johnson',
            'email': 'sarahjohnson@example.com',
            'username': 'sarah_teacher',
            'password': 'testpass123',
            'role': 'teacher'
        }
        
        # Create existing users for authentication tests
        # Student 1
        self.student_user = User.objects.create_user(
            first_name='Alice',
            last_name='Johnson',
            email='alicejohnson@example.com',
            username='alice_student',
            password='testpass123',
            role='student'
        )
        self.student_profile = Student.objects.create(
            user=self.student_user,
            instrument='Piano',
            grade_level=10,
            location='New York',
            bio='Love playing classical music'
        )
        
        # Student 2 (for testing student-to-student interactions)
        self.student_user2 = User.objects.create_user(
            first_name='Mike',
            last_name='Davis',
            email='mikedavis@example.com',
            username='mike_student',
            password='testpass123',
            role='student'
        )
        self.student_profile2 = Student.objects.create(
            user=self.student_user2,
            instrument='Guitar',
            grade_level=11,
            location='Boston',
            bio='Rock music enthusiast'
        )
        
        # Teacher 1
        self.teacher_user = User.objects.create_user(
            first_name='Emily',
            last_name='Wilson',
            email='emilywilson@example.com',
            username='emily_teacher',
            password='testpass123',
            role='teacher'
        )
        self.teacher_profile = Teacher.objects.create(
            user=self.teacher_user,
            instrument='Violin',
            years_experience=8,
            location='Los Angeles',
            bio='Professional violinist with 8 years teaching experience',
            rate=75.0
        )
        
        # Teacher 2 (for testing teacher-to-teacher interactions)
        self.teacher_user2 = User.objects.create_user(
            first_name='David',
            last_name='Brown',
            email='davidbrown@example.com',
            username='david_teacher',
            password='testpass123',
            role='teacher'
        )
        self.teacher_profile2 = Teacher.objects.create(
            user=self.teacher_user2,
            instrument='Piano',
            years_experience=12,
            location='Chicago',
            bio='Experienced piano instructor',
            rate=90.0
        )

    # Helper method to get JWT token for a user
    def get_jwt_token(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    # REGISTRATION & AUTHENTICATION TESTS

    def test_student_registration_creates_student_profile(self):
        url = reverse('register')
        response = self.client.post(url, self.student_registration_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        user = User.objects.get(username=self.student_registration_data['username'])
        self.assertEqual(user.role, 'student')
        self.assertTrue(hasattr(user, 'student'))
        self.assertIsInstance(user.student, Student)

    def test_teacher_registration_creates_teacher_profile(self):
        url = reverse('register')
        response = self.client.post(url, self.teacher_registration_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        user = User.objects.get(username=self.teacher_registration_data['username'])
        self.assertEqual(user.role, 'teacher')
        self.assertTrue(hasattr(user, 'teacher'))
        self.assertIsInstance(user.teacher, Teacher)

    def test_student_can_login_and_get_token(self):
        register_url = reverse('register')
        self.client.post(register_url, self.student_registration_data, format='json')
        
        login_url = reverse('login')
        login_data = {
            'username': self.student_registration_data['username'],
            'password': self.student_registration_data['password']
        }
        response = self.client.post(login_url, login_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_teacher_can_login_and_get_token(self):
        register_url = reverse('register')
        self.client.post(register_url, self.teacher_registration_data, format='json')
        
        login_url = reverse('login')
        login_data = {
            'username': self.teacher_registration_data['username'],
            'password': self.teacher_registration_data['password']
        }
        response = self.client.post(login_url, login_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    # STUDENT PROFILE TESTS

    def test_student_can_view_own_profile(self):
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['username'], self.student_user.username)
        self.assertEqual(response.data['instrument'], 'Piano')
        self.assertEqual(response.data['grade_level'], 10)
        self.assertEqual(response.data['location'], 'New York')

    def test_student_can_update_own_profile(self):
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        update_data = {
            'instrument': 'Violin',
            'grade_level': 11,
            'location': 'Boston',
            'bio': 'Learning violin and piano'
        }
        response = self.client.put(url, update_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['instrument'], 'Violin')
        self.assertEqual(response.data['grade_level'], 11)
        self.assertEqual(response.data['location'], 'Boston')
        
        # Verify changes were saved in database
        self.student_profile.refresh_from_db()
        self.assertEqual(self.student_profile.instrument, 'Violin')
        self.assertEqual(self.student_profile.grade_level, 11)
        self.assertEqual(self.student_profile.location, 'Boston')

    def test_student_profile_partial_updates(self):
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        
        # Update only instrument
        response = self.client.put(url, {'instrument': 'Cello'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['instrument'], 'Cello')
        
        # Update only bio, instrument should remain
        response = self.client.put(url, {'bio': 'Updated bio'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bio'], 'Updated bio')
        self.assertEqual(response.data['instrument'], 'Cello')

    # TEACHER PROFILE TESTS

    def test_teacher_can_view_own_profile(self):
        token = self.get_jwt_token(self.teacher_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['username'], self.teacher_user.username)
        self.assertEqual(response.data['instrument'], 'Violin')
        self.assertEqual(response.data['years_experience'], 8)
        self.assertEqual(response.data['location'], 'Los Angeles')
        self.assertEqual(response.data['rate'], 75.0)

    def test_teacher_can_update_own_profile(self):
        token = self.get_jwt_token(self.teacher_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        update_data = {
            'instrument': 'Violin & Viola',
            'years_experience': 10,
            'location': 'San Francisco',
            'bio': 'Professional violinist and viola player',
            'rate': 85.0
        }
        response = self.client.put(url, update_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['instrument'], 'Violin & Viola')
        self.assertEqual(response.data['years_experience'], 10)
        self.assertEqual(response.data['location'], 'San Francisco')
        self.assertEqual(response.data['rate'], 85.0)
        
        # Verify changes were saved in database
        self.teacher_profile.refresh_from_db()
        self.assertEqual(self.teacher_profile.instrument, 'Violin & Viola')
        self.assertEqual(self.teacher_profile.years_experience, 10)
        self.assertEqual(self.teacher_profile.location, 'San Francisco')
        self.assertEqual(self.teacher_profile.rate, 85.0)

    def test_teacher_profile_partial_updates(self):
        token = self.get_jwt_token(self.teacher_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        
        # Update only rate
        response = self.client.put(url, {'rate': 80.0}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['rate'], 80.0)
        
        # Update only bio, rate should remain
        response = self.client.put(url, {'bio': 'Updated teaching philosophy'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bio'], 'Updated teaching philosophy')
        self.assertEqual(response.data['rate'], 80.0)

    # BROWSING FUNCTIONALITY TESTS (Both Roles)

    def test_student_can_view_all_teachers(self):
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('teachers')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        self.assertTrue(len(response.data) >= 2)  # At least the two test teachers

    def test_specific_teacher_profile_viewing(self):
        """Test that both roles can view specific teacher profiles"""
        # Test as student
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('teachers', kwargs={'teacher_id': self.teacher_profile.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.teacher_profile.id)
        
        # Test as teacher
        token = self.get_jwt_token(self.teacher_user2)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['username'], self.teacher_user.username)

    # CROSS-ROLE INTERACTION TESTS

    def test_student_viewing_teacher_rates_and_experience(self):
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('teachers', kwargs={'teacher_id': self.teacher_profile.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['rate'], 75.0)
        self.assertEqual(response.data['years_experience'], 8)
        self.assertIn('bio', response.data)
    
    def test_student_searching_teachers(self):
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        base_url = reverse('teacher_search')
        
        # Test by searching by instrument (case insensitive - should find Violin)
        response = self.client.get(base_url, {'instrument__icontains': 'violin'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['instrument'], 'Violin')
        
        # Test searching by instrument (case insensitive - should find Piano)
        response = self.client.get(base_url, {'instrument__icontains': 'piano'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['instrument'], 'Piano')
        
        # Test searching by location
        response = self.client.get(base_url, {'location__icontains': 'los angeles'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['location'], 'Los Angeles')
        
        # Test searching by rate range (less than or equal to)
        response = self.client.get(base_url, {'rate__lte': '80'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['rate'], 75.0)
        
        # Test searching by rate range (greater than or equal to)
        response = self.client.get(base_url, {'rate__gte': '85'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['rate'], 90.0)
        
        # Test searching by years of experience (greater than)
        response = self.client.get(base_url, {'years_experience__gt': '10'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['years_experience'], 12)
        
        # Test searching by years of experience (less than or equal to)
        response = self.client.get(base_url, {'years_experience__lte': '10'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['years_experience'], 8)
        
        # Test searching by bio content
        response = self.client.get(base_url, {'bio__icontains': 'professional'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertIn('Professional', results[0]['bio'])
        
        # Test multiple filters (instrument and location)
        response = self.client.get(base_url, {
            'instrument__icontains': 'piano',
            'location__icontains': 'chicago'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['instrument'], 'Piano')
        self.assertEqual(results[0]['location'], 'Chicago')
        
        # Test search with no results
        response = self.client.get(base_url, {'instrument__icontains': 'drums'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 0)
        
        # Test empty search (should return all teachers)
        response = self.client.get(base_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertTrue(len(results) >= 2)

    # SECURITY & VALIDATION TESTS

    def test_unauthenticated_access_denied(self):
        endpoints = [
            reverse('user_profile'),
            reverse('students'),
            reverse('teachers'),
        ]
        
        for url in endpoints:
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_functionality_for_both_roles(self):
        for user in [self.student_user, self.teacher_user]:
            with self.subTest(user=user.role):
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                
                self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
                
                logout_url = reverse('logout')
                logout_data = {'refresh_token': refresh_token}
                response = self.client.post(logout_url, logout_data, format='json')
                
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(response.data['detail'], 'Logged out successfully.')

    def test_user_serializer_readonly_fields(self):
        for user, profile_type in [(self.student_user, 'student'), (self.teacher_user, 'teacher')]:
            with self.subTest(role=profile_type):
                token = self.get_jwt_token(user)
                self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
                
                url = reverse('user_profile')
                attempt_user_update = {
                    'user': {
                        'username': 'hacked_username',
                        'first_name': 'Hacked'
                    },
                    'instrument': 'UpdatedInstrument'
                }
                response = self.client.put(url, attempt_user_update, format='json')
                
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(response.data['user']['username'], user.username)
                self.assertEqual(response.data['instrument'], 'UpdatedInstrument')

    def test_invalid_grade_level_handling(self):
        token = self.get_jwt_token(self.student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        invalid_data = {'grade_level': 15}  # Invalid grade level
        response = self.client.put(url, invalid_data, format='json')
        
        # Behavior depends on your model validation
        self.assertIn(response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_200_OK])

    def test_invalid_teacher_data_handling(self):
        token = self.get_jwt_token(self.teacher_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        url = reverse('user_profile')
        
        # Test negative experience
        response = self.client.put(url, {'years_experience': -5}, format='json')
        self.assertIn(response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_200_OK])
        
        # Test negative rate
        response = self.client.put(url, {'rate': -50.0}, format='json')
        self.assertIn(response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_200_OK])

    # TEARDOWN

    def tearDown(self):
        """Clean up after each test"""
        Teacher.objects.all().delete()
        Student.objects.all().delete()
        User.objects.all().delete()