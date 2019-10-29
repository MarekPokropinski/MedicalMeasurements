from rest_framework import permissions


class IsOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if not super().has_object_permission(request, view, obj):
            return False

        return obj.user and obj.user == request.user
